# Scripts

The following executable scripts are provided:

 - `build-info.sh`: Writes out a `build-info.txt` file to the `dist/static` directory to save when, where and from what commit the output was built
 - `check-node.sh`: Ensures the running version of Node matches the `.nvmrc` configuration
 - `cyf-branch.sh`: Prepares a Code Your Future version of the repo using the files in `files/`
   - remove tests and related configuration
   - remove CSP checking from Helmet configuration
   - add MongoDB if `--db mongo` is set
   - add Postgres if `--db postgres` is set
