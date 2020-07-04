#include "../../foundation/re2.h"
#include "../../foundation/filtered_re2.h"
#include <stdio.h>
#include <string>
#include <vector>
#include <iostream>

extern "C"
{
    // Emscripten works only with C code, so instead string we use char*
    // Return the pointer of input string
    char *getStringPtr(const std::string &inputString)
    {
        char *stringPtr = new char[inputString.length() + 1];
        strcpy(stringPtr, inputString.c_str());
        return stringPtr;
    }

    // Return the number of capturing subpatterns
    // if the regexp is "(a)(b)", returns 2 + 1(do for fullcapture).
    int getQtyOfCapturingGroups(char *inputRegex)
    {
        return re2::RE2(inputRegex).NumberOfCapturingGroups();
    }

    // Return the number of matched groups
    // Example:
    // getQtyOfMatchedGroups('123abc123abc123', '(abc)', 'g') return 2
    // getQtyOfMatchedGroups('123abc123abc123', '(abc)', '') return 1
    int getQtyOfMatchedGroups(char *inputString, char *inputRegex, char *flag)
    {
        if (*flag != 'g')
            return 1;
        re2::StringPiece sp(inputString);
        re2::RE2 regex(inputRegex);

        int n = getQtyOfCapturingGroups(inputRegex) + 1;
        std::vector<re2::StringPiece> groups(n);

        int count = 0,
            lastIndex = 0;

        while (regex.Match(sp, lastIndex, sp.size(), re2::RE2::UNANCHORED, &(groups[0]), groups.size()))
        {
            lastIndex += groups[0].data() - sp.data() + groups[0].size() - lastIndex;
            count++;
        }

        return count;
    }

    // Additional function for getting pointers from matrix.
    char *getStringPtrFromMatrix(char ***stringArray, int raw, int columns)
    {
        return stringArray[raw][columns];
    }

    // Checks that supplied text matches a
    // supplied regex exactly.
    // Example:
    // check("hello", "ell"); return TRUE
    // check("hello", "123"); return FALSE
    bool check(char *text, char *regex)
    {
        return re2::RE2::PartialMatch(text, regex);
    }

    // Replace the first match of "regex" in "text" with "rewrite".
    // Example: simple replace:
    // replace('XMAS : Twas the night before Xmas...', '(?i)xmas', 'Christmas', '')
    // return 'Christmas : Twas the night before Xmas...')
    //
    // With flag global replace all matches of "regex" in "text" with "rewrite".
    // Example: simple replace with flag global:
    // replace('XMAS : Twas the night before Xmas...', '(?i)xmas', 'Christmas', 'g')
    // return 'Christmas : Twas the night before Christmas...'
    char *replace(char *text, char *regex, char *rewrite, char *flag)
    {
        std::string replacedString = text;
        if (*flag == 'g')
            re2::RE2::GlobalReplace(&replacedString, regex, rewrite);
        else
            re2::RE2::Replace(&replacedString, regex, rewrite);
        return getStringPtr(replacedString);
    }

    // Return error message if regex invalid
    void *validate(char *regexp)
    {
        re2::RE2 regex(regexp);
        return regex.ok() ? nullptr : getStringPtr(regex.error());
    }

    // Capture the first match of "regex" in "text".
    // Example: simple exec:
    // exec('123abc123abc123', '(abc)', '')
    // return [[abc, abc]]. First element is fullmatch, rest are captures
    //
    // With flag global capture all matches of "regex" in "text".
    // Example: simple exec with flag global:
    // exec('123abc123abc123', '(abc)', 'g')
    // return [[abc, abc], [abc, abc]]
    void *exec(char *inputString, char *inputRegex, char *flag)
    {
        re2::StringPiece sp(inputString);
        re2::RE2 regex(inputRegex);

        int raw = getQtyOfCapturingGroups(inputRegex) + 1;
        std::vector<re2::StringPiece> groups(raw);

        if (!check(inputString, inputRegex))
            return nullptr;

        int columns = getQtyOfMatchedGroups(inputString, inputRegex, flag);
        char ***result = new char **[columns];
        int count = 0,
            lastIndex = 0;

        while (regex.Match(sp, lastIndex, sp.size(), re2::RE2::UNANCHORED, &(groups[0]), groups.size()))
        {
            result[count] = new char *[raw];
            for (int i = 0; i < raw; ++i)
            {
                const size_t size = groups[i].size();
                result[count][i] = new char[size + 1];
                groups[i].copy(result[count][i], size);
                result[count][i][size] = '\0';
            }

            if (*flag != 'g')
                break;
            lastIndex += groups[0].data() - sp.data() + groups[0].size() - lastIndex;
            count++;
        }
        return result;
    }
}
