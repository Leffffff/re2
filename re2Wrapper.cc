#include "src/re2.h"
#include "src/filtered_re2.h"
#include <stdio.h>
#include <string>
#include <vector>
#include <iostream>

// em++ re2Wrapper.cc src/re2.cc src/filtered_re2.cc src/prefilter_tree.cc src/regexp.cc src/stringpiece.cc src/unicode_*.cc src/perl_groups.cc src/parse.cc src/rune.cc src/simplify.cc src/compile.cc src/prog.cc src/nfa.cc src/onepass.cc src/prefilter.cc src/dfa.cc src/bitstate.cc src/tostring.cc -o re2Lib.js -s LINKABLE=1 -s EXPORT_ALL=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["stringToUTF8", "UTF8ToString"]' -s MODULARIZE=1 -s 'EXPORT_NAME="RegExp2"'

extern "C"
{
    char* getPtr(const std::string &message)
    {
        char* m = new char[message.length() + 1];
        strcpy(m, message.c_str());
        return m;
    }

    int getNumberOfCapturingGroups(char* inputRegex){
        return re2::RE2(inputRegex).NumberOfCapturingGroups();
    }

    char* getStringPtrByIndex(char** stringArray, int index){
        return stringArray[index];
    }

    void clearArray(char** stringArray, int size){
        for (int i = 0; i < size; ++i) {
            delete[] stringArray[i];
        }
        delete[] stringArray;
    }

    void* getCapturingGroups(char *inputString, char *inputRegex)
    {
        re2::RE2 regex(inputRegex);
        if(regex.error_code()){
            return nullptr;
        }
        int n = regex.NumberOfCapturingGroups();

        std::vector<re2::RE2::Arg> argv(n); //need refactor
        std::vector<re2::RE2::Arg*> args(n);
        std::vector<re2::StringPiece> ws(n);
        for (int i = 0; i < n; ++i) {
            args[i] = &argv[i];
            argv[i] = &ws[i];
        }
        if(!re2::RE2::PartialMatchN(inputString, inputRegex, &(args[0]), n)){
            return nullptr;
        }
        char** result = new char*[n];
        for (int i = 0; i < n; ++i) {
            const size_t size = ws[i].size();
            result[i] = new char[size + 1];
            ws[i].copy(result[i], size);
            result[i][size] = '\0';
        }
        return result;
    }

    bool check(char* text, char *regex)
    {
        return re2::RE2::PartialMatch(text, regex);
    }

    char* replace(char* text, char* regex, char* rewrite, char* flag) {
        std::string replacedString = text;
        if (*flag == 'g') {
            re2::RE2::GlobalReplace(&replacedString, regex, rewrite);
        } else {
            re2::RE2::Replace(&replacedString, regex, rewrite);
        }
        return getPtr(replacedString);
    }

    char* singleMatch(char *text, char *regex)
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

    char* validate(char *regexp)
    {
        re2::RE2 regex(regexp);
        std::string message = "ok";
        return regex.ok() ? getPtr(message) : getPtr(regex.error());
    }
}
