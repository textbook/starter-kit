# Scripts

The following executable scripts are provided:

 - `build-info.sh`: Writes out a `build-info.txt` file to the `dist/static` directory to save when, where and from what commit the output was built
 - `cyf-branch.sh`: Prepares a Code Your Future version of the repo using the files in `files/`
   - remove tests and related configuration
   - remove CSP checking from Helmet configuration
   - add MongoDB if `--db mongo` is set
   - add Postgres if `--db postgres` is set
- `up-to-date.sh`: Updates all NPM dependencies to the latest compatible versions, tests the result, then commits and pushes if everything is fine
