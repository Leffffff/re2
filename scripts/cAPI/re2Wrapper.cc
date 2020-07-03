#include "../../basement/re2.h"
#include "../../basement/filtered_re2.h"
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
        return re2::RE2(inputRegex).NumberOfCapturingGroups() + 1;
    }

    // Return the number of matched groups, this work only for regex with flag global 'g'
    // Example: we have text string '123abc123abc123' and regex '(abc)', with flag global getQtyOfMatchedGroups() return 2, without function return 1  
    int getQtyOfMatchedGroups(char *inputString, char *inputRegex, char *flag)
    {
        if (*flag != 'g')
            return 1;
        re2::StringPiece sp(inputString);
        re2::RE2 regex(inputRegex);

        int n = getQtyOfCapturingGroups(inputRegex);
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
    char *getStringPtrFromMatrix(char ***stringArray, int raw, int columns)
    {
        return stringArray[raw][columns];
    }

    // The "FullMatch" operation checks that supplied text matches a
    // supplied pattern exactly.
    // Example: simple search for a string:
    // TRUE check(("hello", "ell"));
    // FALSE check(("hello", "123"));
    bool check(char *text, char *regex)
    {
        return re2::RE2::PartialMatch(text, regex);
    }
    // Replace the first match of "re" in "str" with "rewrite".
    // Within "rewrite", backslash-escaped digits (\1 to \9) can be
    // used to insert text matching corresponding parenthesized group
    // from the pattern.  \0 in "rewrite" refers to the entire matching
    // text.  E.g.,
    //
    //   std::string s = "yabba dabba doo";
    //   CHECK(RE2::Replace(&s, "b+", "d"));
    //
    // will leave "s" containing "yada dabba doo"
    //
    // Returns true if the pattern matches and a replacement occurs,
    // false otherwise.

    // Like Replace(), except replaces successive non-overlapping occurrences
    // of the pattern in the string with the rewrite. E.g.
    //
    //   std::string s = "yabba dabba doo";
    //   CHECK(RE2::GlobalReplace(&s, "b+", "d"));
    //
    // will leave "s" containing "yada dada doo"
    // Replacements are not subject to re-matching.
    //
    // Because GlobalReplace only replaces non-overlapping matches,
    // replacing "ana" within "banana" makes only one replacement, not two.
    //
    // Returns the number of replacements made.
    char *replace(char *text, char *regex, char *rewrite, char *flag)
    {
        std::string replacedString = text;
        if (*flag == 'g')
            re2::RE2::GlobalReplace(&replacedString, regex, rewrite);
        else
            re2::RE2::Replace(&replacedString, regex, rewrite);
        return getStringPtr(replacedString);
    }

    void *validate(char *regexp)
    {
        re2::RE2 regex(regexp);
        return regex.ok() ? nullptr : getStringPtr(regex.error());
    }

    void *exec(char *inputString, char *inputRegex, char *flag)
    {
        re2::StringPiece sp(inputString);
        re2::RE2 regex(inputRegex);

        int n = getQtyOfCapturingGroups(inputRegex);
        std::vector<re2::StringPiece> groups(n);

        if (!check(inputString, inputRegex))
            return nullptr;

        int nn = getQtyOfMatchedGroups(inputString, inputRegex, flag);
        char ***result = new char **[nn];
        int count = 0,
            lastIndex = 0;

        while (regex.Match(sp, lastIndex, sp.size(), re2::RE2::UNANCHORED, &(groups[0]), groups.size()))
        {
            result[count] = new char *[n];
            for (int i = 0; i < n; ++i)
            {
                const size_t size = groups[i].size();
                result[count][i] = new char[size + 1];
                groups[i].copy(result[count][i], size);
                result[count][i][size] = '\0';
            }

            if (*flag != 'g')
                break;
            std::cout<< "lastIndex before = "<< lastIndex <<std::endl;
            std::cout<< "groups[0].data() = "<< groups[0].data() <<std::endl;
            std::cout<< "sp.data() = "<< sp.data() <<std::endl;
            std::cout<< "groups[0].size() = "<< groups[0].size() <<std::endl;
            std::cout<< "groups[0].data() - sp.data() = "<< groups[0].data() - sp.data() <<std::endl;
            lastIndex += groups[0].data() - sp.data() + groups[0].size() - lastIndex;
            std::cout<< "lastIndex after = "<< lastIndex <<std::endl;
            count++;
        }
        return result;
    }
}
