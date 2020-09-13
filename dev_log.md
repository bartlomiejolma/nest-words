# Dev log

Kept internally in order to easily pick the work that was left from the previous coding session.

## 13.09.2020

Adding db configuration

Next goal is to integrate with TypeORM

Working on resolving issue with the imports in the test. The app is working, but in the tests the src is not working properly.

Objective was to use absolute imports for the consts.

The change in the `package.json` of https://jestjs.io/docs/en/configuration#rootdir-string
was not needed (it broke imports in the source files)

Now, the only relative import is in the test.

Fix this import now. 

Keep, the import as it is.
The `roots` key list all things to add to `rootDir`

I was following this guide:
https://docs.nestjs.com/recipes/sql-typeorm

Probably I should switch to this usage fo TypeORM:
https://docs.nestjs.com/techniques/database
