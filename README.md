# nx-global-declarations

Nx global typescript declarations

Nx doesn’t have a way to define global typescript declarations, you must put them in every project or have them in one 
place and add an include in every tsconfig file.

This script assumes that you will Create a folder called types in the top level of your repo, and put all your global .d.ts 
declarations files there, somehting like:

```
mkdir  types
touch types/globals.d.ts
```


Run the shell script:

```
add-nx-global.sh
```

Will add and include entry in every tsconfig file with an entry called ../../types. 
This version just work with a two level hierarchy.


Recomendation: Commit before execute.

