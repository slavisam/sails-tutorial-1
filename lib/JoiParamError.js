/**
 * @module Local/JoiParamError
 * @desc Error object describing a single invalid parameter
 * @example
 *
 *    throw new JoiParamError (e) <= Where E should be a ValidationError from Joi library
 *
 *    The exception will take the first validation error and hoist the details
 */

module.exports = JoiParamError

var inherits = require ('util').inherits
var SymbolicError = require ('Local/SymbolicError')

function JoiParamError (validationError) {
    // TODO - maybe some error checking?
    var detail = validationError.details [0];
    var message = detail.message;
    var param = detail.path;

    SymbolicError.call (this, 'api.paramInvalid', message, validationError)
    this.param = param;
}

inherits (JoiParamError, SymbolicError)

var Class = JoiParamError.prototype;






