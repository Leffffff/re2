#include "src/re2.h"
#include "src/filtered_re2.h"
#include <stdio.h>
#include <string>
#include <iostream>

// em++ re2Wrapper.cc src/re2.cc src/filtered_re2.cc src/prefilter_tree.cc src/regexp.cc src/stringpiece.cc src/unicode_*.cc src/perl_groups.cc src/parse.cc src/rune.cc src/simplify.cc src/compile.cc src/prog.cc src/nfa.cc src/onepass.cc src/prefilter.cc src/dfa.cc src/bitstate.cc src/tostring.cc -o re2Lib.js -s LINKABLE=1 -s EXPORT_ALL=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["stringToUTF8", "UTF8ToString"]' -s MODULARIZE=1 -s 'EXPORT_NAME="RegExp2"' -O3

extern "C"
{
    char *getPtr(std::string message)
    {
        char *m = new char[message.length() + 1];
        strcpy(m, message.c_str());
        return m;
    }

    // , char **outCapturedArray, int *outCapturedArraySize
    // char **stringTestFunc2(char *inputString, char *inputRegex)
    // {
    //     re2::RE2 regex(inputRegex);
    //     std::cout << regex.NumberOfCapturingGroups() << std::endl;
    //     // std::string captured;
    //     re2::RE2::PartialMatchN(inputString, regex, ptr, regex.NumberOfCapturingGroups());
    //     char *outString = new char[captured.length() + 1];
    //     strcpy(outString, captured.c_str());
    //     return outString;
    // }

    bool check(char *text, char *regex)
    {
        return re2::RE2::PartialMatch(text, regex);
    }

    char *singleMatch(char *text, char *regex)
    {
        if (check(text, regex))
        {
            std::string captured;
            re2::RE2::PartialMatch(text, regex, &captured);
            return getPtr(captured);
        }
        else
        {
            return 0;
        }
    }

    char *validate(char *regexp)
    {
        re2::RE2 regex(regexp);
        std::string message = "ok";
        return regex.ok() ? getPtr(message) : getPtr(regex.error());
    }
}
