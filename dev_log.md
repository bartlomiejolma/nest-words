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

Use, the global TypeORM


Problem with user login

Does config work?
isGlobal did not help https://docs.nestjs.com/techniques/configuration#use-module-globally

It seem to not work from the beginning

How to make the TypeOrmModule get config from ConfigService? 

Here they use directly `dotenv`
https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f

going through the list:
https://awesomeopensource.com/project/juliandavidmr/awesome-nestjs


------
For now droping the idea of usage:
https://docs.nestjs.com/techniques/database

There are problems with the connection when using this approach

So, stick withouth @nestjs/typeorm


Added defintions to each word

Changes in 3 files

In entity many to one relation:
https://typeorm.io/#/many-to-one-one-to-many-relations

Can I use single interface for all of them?

Switched to implementing the interface.

Defintions does not get saved in the db

needs to provide the repository.

Do not go with the cascading option for save.
https://typeorm.io/#/relations/cascades

Find with relations to return defintions too:
https://typeorm.io/#/find-options


Added validation for a simple rule following the guideline:
https://docs.nestjs.com/techniques/validation

(added class-validator and class-transformer)

When adding the test for the e2e found that this test was disabled because of the package.json jest root config.

Issue with absolute imports there

Validation is done over the app.module, but test is using the module without the Pipe

Suggested solution:
https://stackoverflow.com/questions/60819612/how-to-test-validation-pipe-is-throwing-the-expect-error-for-improperly-shaped-r

skip this test for now.


setup node github action seem to be supporting yarn
https://github.com/marketplace/actions/setup-node-js-environment

no `ci` command for yarn, use install instead

how to hande e2e test without db an with connection error?

set up the database as github action

https://freek.dev/1590-how-to-use-a-mysql-database-on-github-actions

https://medium.com/@ldarren/number-of-ways-to-setup-database-in-github-actions-2cd48df9faae

specific action for postgres
https://github.com/marketplace/actions/setup-postgresql
https://github.com/Harmon758/postgresql-action/blob/master/action.yml

Must setup the db host, user, pwd

Use env. variables in yaml
https://docs.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables

Now it all works.


Added waterfall test for testing complex logic

Added faker to the test for different generated words.

https://stackoverflow.com/questions/45278398/how-to-use-faker-js-in-typescript

Next:
Proper typeOrm integration

JWT authentication with 3rd party integration (Firebase?)

Following this:
https://wanago.io/2020/05/18/api-nestjs-postgresql-typeorm/

https://docs.nestjs.com/techniques/configuration#schema-validation

added joi schema validation

Most part worked. 
Had to stop using the custom words providers.

(To be deleted)

The change in the unit test was important.
Details described:
https://wanago.io/2020/07/06/api-nestjs-unit-tests/

Mocking the database connection

Speeding up tests
https://megafauna.dev/jest-speed-up-slow-test-suites/

add sort imports rule

Authentication
https://docs.nestjs.com/techniques/authentication

got to JWT, 
need to store users with hashed pwd in db.

Fixed issue with test based on:
https://github.com/nestjs/nest/blob/master/sample/19-auth-jwt/src/auth/auth.service.spec.ts

https://wanago.io/2020/05/25/api-nestjs-authenticating-users-bcrypt-passport-jwt-cookies/


Added jwt module using the registerAsync to get secret from config
https://github.com/nestjs/jwt#async-options


curl -X POST http://localhost:3005/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"

curl http://localhost:3005/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzeWIiOjEsImlhdCI6MTYwMzgwMTU4OSwiZXhwIjoxNjAzODAxNjQ5fQ.uQAsneLArKl2IMCckpo-S1lkxrRncSD_EuH7AAfVZWk"

Implemented jwt authentication.

Now needs to work on proper user save.

https://wanago.io/2020/05/25/api-nestjs-authenticating-users-bcrypt-passport-jwt-cookies/
bcrypt


Get to the "Creating the authentication service"


curl -X POST http://localhost:5000/auth/login -d '{"name": "test", "password": "pwd"}' -H "Content-Type: application/json"

curl -X POST http://localhost:5000/auth/register -d '{"name": "foo", "password": "pwdverylong", "email": "mail@email.com"}' -H "Content-Type: application/json"

curl http://localhost:5000/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzeWIiOjEsImlhdCI6MTYwNDA4OTYyOSwiZXhwIjoxNjA0MDkwMjI5fQ.1KNQXx67jDP4knf-XdBtdEvkNTVWdCCGjpMTTcPaLWM"

Added exclude from the:
https://wanago.io/2020/06/08/api-nestjs-serializing-response-interceptors/

Finished auth flow. 

Next, refresh token:

https://wanago.io/2020/09/21/api-nestjs-refresh-tokens-jwt/

-----
Add OpenAPI documentation
https://docs.nestjs.com/openapi/introduction


-----
Next: add exercises module

have a way to post (start)
then post on /answer
and get a /result
hateos in links?