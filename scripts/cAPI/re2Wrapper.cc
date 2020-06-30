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

    int getCountOfGroups(char *inputString, char *inputRegex)
    {
        re2::StringPiece sp(inputString);
        int count = 0;
        while(re2::RE2::FindAndConsume(&sp, inputRegex)) { count++; }
            
        return count;
    }

    char *getStringPtrByIndex(char **stringArray, int index)
    {
        return stringArray[index];
    }

    void *exec(char *inputString, char *inputRegex)
    {
        re2::RE2 regex(inputRegex);
        re2::StringPiece sp(inputString);
        int n = regex.NumberOfCapturingGroups();
        std::vector<re2::RE2::Arg> argv(n); //need refactor
        std::vector<re2::RE2::Arg *> args(n);
        std::vector<re2::StringPiece> ws(n);
        std::cout << "kek1" << std::endl;
        for (int i = 0; i < n; ++i)
        {
            args[i] = &argv[i];
            argv[i] = &ws[i];
        }
        std::cout << "kek2 "<< sp << std::endl;
        if (!re2::RE2::FindAndConsumeN(&sp, inputRegex, &(args[0]), n))
        {
            std::cout << "kekekeke"<< std::endl;
            return nullptr;
        }
        std::cout << "kek3 "<< sp << std::endl;
        char **result = new char *[n];
        for (int i = 0; i < n; ++i)
        {
            std::cout << "kekv"<< i << std::endl;
            const size_t size = ws[i].size();
            result[i] = new char[size + 1];
            ws[i].copy(result[i], size);
            result[i][size] = '\0';
            std::cout << result[i] << std::endl;
        }
        return result;
    }

  void *execNew(char *inputString, char *inputRegex)
    {
        re2::RE2 regex(inputRegex);
        re2::StringPiece sp(inputString);
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
            std::cout << "Check this"<< std::endl;
            return nullptr;
        }
        int nn = getCountOfGroups(inputString, inputRegex);
        // std::string string_result[nn][n];
        char ***result = new char **[nn];
        std::cout << "text "<< sp << std::endl;
        int count = 0;
        while(re2::RE2::FindAndConsumeN(&sp, inputRegex, &(args[0]), n)) {
            std::cout << "unconsumed text "<< sp << std::endl;
            result[count] = new char*[n];
            for (int i = 0; i < n; ++i)
            {
                const size_t size = ws[i].size();
                result[count][i] = new char[size + 1];
                ws[i].copy(result[count][i], size);
                result[count][i][size] = '\0';
                std::cout << "result[" << count << "]"<< "[" << i << "] = " <<result[count][i] << std::endl;
            }
            count++;
        }
        return result;
    }

  void *execNewSE(char *inputString, char *inputRegex)
    {
        // std::string input = inputString;
        re2::StringPiece sp(inputString);
        re2::RE2 regex(inputRegex);
        std::vector<re2::StringPiece> groups(regex.NumberOfCapturingGroups() + 1);

        int lastIndex = 0;

        while(regex.Match(sp, lastIndex, sp.size(), re2::RE2::UNANCHORED, &groups[0], groups.size())) {
            std::cout << groups[0] << std::endl;
            // result[count] = new char*[n];
            // for (int i = 0; i < n; ++i)
            // {
            //     const size_t size = ws[i].size();
            //     result[count][i] = new char[size + 1];
            //     ws[i].copy(result[count][i], size);
            //     result[count][i][size] = '\0';
            //     std::cout << "result[" << count << "]"<< "[" << i << "] = " <<result[count][i] << std::endl;
            // }
            lastIndex++;
        }

        // re2::StringPiece sp(inputString);
        // int n = regex.NumberOfCapturingGroups();

        // std::vector<re2::RE2::Arg> argv(n); //need refactor
        // std::vector<re2::RE2::Arg *> args(n);
        // std::vector<re2::StringPiece> ws(n);

        // for (int i = 0; i < n; ++i)
        // {
        //     args[i] = &argv[i];
        //     argv[i] = &ws[i];
        // }


        // if (!re2::RE2::PartialMatchN(inputString, inputRegex, &(args[0]), n))
        // {
        //     std::cout << "Check this"<< std::endl;
        //     return nullptr;
        // }
        // int nn = getCountOfGroups(inputString, inputRegex);
        // // std::string string_result[nn][n];
        // char ***result = new char **[nn];
        // std::cout << "text "<< sp << std::endl;
        // int count = 0;
        // while(re2::RE2::FindAndConsumeN(&sp, inputRegex, &(args[0]), n)) {
        //     std::cout << "unconsumed text "<< sp << std::endl;
        //     result[count] = new char*[n];
        //     for (int i = 0; i < n; ++i)
        //     {
        //         const size_t size = ws[i].size();
        //         result[count][i] = new char[size + 1];
        //         ws[i].copy(result[count][i], size);
        //         result[count][i][size] = '\0';
        //         std::cout << "result[" << count << "]"<< "[" << i << "] = " <<result[count][i] << std::endl;
        //     }
        //     count++;
        // }
        return nullptr;
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
