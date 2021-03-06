/**
 * TestSetup class is a setup for a unit test. Initialization of the constructor,
 * by default, assumes a parallel test directory structure to that of the actual
 * files under test (this can be overridden in the constructor).  This makes locating
 * the files to be tested mostly automatic, and less brittle than specifying string paths.
 *
 * @module Local/TestSetup
 * @example
 *     var TestSetup = require ('Local/TestSetup')
 *     var test = new TestSetup (__filename)
 *     var Unit = test.require ()
 *     // snip ...
 *     // Unit is the loaded unit under test, e.g.:
 *         assert.equal ('Roger', Unit.cleanProperName ('  Roger '))
 */

module.exports = TestSetup

function TestSetup (testFilePath, unitFilePath) {
    this.testFilePath = testFilePath
    if (unitFilePath === undefined)
        this.unitFilePath = this.getAssociatedUnitFilePath ()
}

var TOP_LEVEL_TEST_DIR = "tests"

TestSetup.prototype.getAssociatedUnitFilePath = function () {

    // Given an absolute path to a test file, in a parallel directory structure, under
    // "/tests", find the unit file that we should be testing (unit file and test file
    // must have exact same name)

    // Assume testing has been launched from top-level directory, and that
    // our tests are defined under a parallel stucture in /tests directory in top-level

    var cwd = process.cwd ()

    // Make sure current working directory + /tests at beginning testFilepath, and remove.
    // (has the effect of removing /tests from the filepath, as well as making sure we
    // are in a parallel directory structure, as a sanity check).

    var dir = cwd + "/" + TOP_LEVEL_TEST_DIR

    var i = this.testFilePath.indexOf (dir)
    if (i != 0)
        throw { code: '', message: "Unit Test filepath = " + this.testFilePath +
                ".  File is not in directory = " + dir };

    var unitFilePath = cwd + this.testFilePath.substr (dir.length)
    return unitFilePath
}

TestSetup.prototype.require = function () {
    return require (this.unitFilePath)
}
