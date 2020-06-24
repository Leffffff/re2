#include "../../basement/re2.h"
#include "../../basement/filtered_re2.h"
#include <stdio.h>
#include <string>
#include <vector>
#include <iostream>

extern "C"
{
    char *getStringPtr(const std::string &inputString)
    {
        char *stringPtr = new char[inputString.length() + 1];
        strcpy(stringPtr, inputString.c_str());
        return stringPtr;
    }

    char *escapeMetaCharacter(char *inputText)
    {
        return getStringPtr(re2::RE2::QuoteMeta(inputText));
    }
    
    int getNumberOfCapturingGroups(char *inputRegex)
    {
        return re2::RE2(inputRegex).NumberOfCapturingGroups();
    }

    char *getStringPtrByIndex(char **stringArray, int index)
    {
        return stringArray[index];
    }

    void *getCapturingGroups(char *inputString, char *inputRegex)
    {
        re2::RE2 regex(inputRegex);
        int n = regex.NumberOfCapturingGroups();

        std::vector<re2::RE2::Arg> argv(n); //need refactor
        std::vector<re2::RE2::Arg *> args(n);
        std::vector<re2::StringPiece> ws(n);

        for (int i = 0; i < n; ++i)
        {
            args[i] = &argv[i];
            argv[i] = &ws[i];
        }

        if (!re2::RE2::PartialMatchN(inputString, inputRegex, &(args[0]), n))
        {
            return nullptr;
        }

        char **result = new char *[n];
        for (int i = 0; i < n; ++i)
        {
            const size_t size = ws[i].size();
            result[i] = new char[size + 1];
            ws[i].copy(result[i], size);
            result[i][size] = '\0';
        }
        return result;
    }

    bool check(char *text, char *regex)
    {
        return re2::RE2::PartialMatch(text, regex);
    }

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
}
