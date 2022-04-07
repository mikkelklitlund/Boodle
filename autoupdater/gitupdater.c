#include <stdlib.h>
#include <stdio.h>

#define SHELLSCRIPT "\
#/bin/bash \n\
echo \"git pull\" \n\
echo \"INDSÆT MAIL\" \n\
echo \"INDSÆT TOKEN\" \n\
"

int main(void){
puts("starting script");
int status = system(SHELLSCRIPT);
return 0;
}