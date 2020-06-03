#include "src/re2.h"
#include "src/filtered_re2.h"
#include <stdio.h>
#include <string>
#include <iostream>

// em++ re2Wrapper.cc src/re2.cc src/filtered_re2.cc src/prefilter_tree.cc src/regexp.cc src/stringpiece.cc src/unicode_*.cc src/perl_groups.cc src/parse.cc src/rune.cc src/simplify.cc src/compile.cc src/prog.cc src/nfa.cc src/onepass.cc src/prefilter.cc src/dfa.cc src/bitstate.cc src/tostring.cc -o re2Lib.js -s LINKABLE=1 -s EXPORT_ALL=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["stringToUTF8", "UTF8ToString"]' -s MODULARIZE=1 -s 'EXPORT_NAME="RegExp2"' -O3

extern "C"
{

    // bool stringTestFunc2(char* inputString, char* inputRegex, char** outCapturedArray, int* outCapturedArraySize) {
    //     re2::RE2 regex(inputRegex);
    //     std::cout<< regex.NumberOfCapturingGroups() <<std::endl;
    //     std::string captured;
    //     re2::RE2::FullMatch(text,regex, &captured);
    //     char* outString = new char[captured.length() + 1];
    //     strcpy(outString, captured.c_str());
    //     return outString; /
    // }

    bool check(char *text, char *regex)
    {
        if (re2::RE2::PartialMatch(text, regex))
            return true;
        return false;
    }

    char *singleMatch(char *text, char *regex)
    {
        if (check(text, regex))
        {
            std::string captured;
            re2::RE2::PartialMatch(text, regex, &captured);
            char *outString = new char[captured.length() + 1];
            strcpy(outString, captured.c_str());
            return outString;
        }
        else
        {
            return 0;
        }
    }
}