#include "src/re2.h"
#include "src/filtered_re2.h"
#include <stdio.h>
#include <string>
#include <iostream>

//em++ my_test.cc src/re2.cc src/filtered_re2.cc src/prefilter_tree.cc src/regexp.cc src/stringpiece.cc src/unicode_*.cc src/perl_groups.cc src/parse.cc src/rune.cc src/simplify.cc src/compile.cc src/prog.cc src/nfa.cc src/onepass.cc src/prefilter.cc src/dfa.cc src/bitstate.cc src/tostring.cc -o re2.html -s LINKABLE=1 -s EXPORT_ALL=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["stringToUTF8", "UTF8ToString"]'

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

    char *stringTestFunc(char *text, char *regex)
    {
        std::string captured;
        re2::RE2::PartialMatch(text, regex, &captured);
        char *outString = new char[captured.length() + 1];
        strcpy(outString, captured.c_str());
        return outString;
    }

    bool boolTestFunc(char *text, char *regex)
    {
        if (re2::RE2::PartialMatch(text, regex))
        {
            printf("PASS\n");
            return true;
        }
        printf("FAIL\n");
        return false;
    }
}
