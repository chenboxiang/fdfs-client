/**
 * Author: chenboxiang
 * Date: 14-6-14
 * Time: 下午10:53
 */
'use strict'

var helpers = require('../lib/helpers')
var expect = require('expect.js')

describe('helpers', function() {
    describe('#number2Buffer(number, bytes)', function() {
        it('number should convert to correct buffer', function() {
            var buffer = helpers.number2Buffer(0x11223344, 4)
            expect(buffer.length).to.be(4)
            expect(buffer.readUInt8(0)).to.be(0x11)
            expect(buffer.readUInt8(1)).to.be(0x22)
            expect(buffer.readUInt8(2)).to.be(0x33)
            expect(buffer.readUInt8(3)).to.be(0x44)
        })
    })

    describe('#buildConstProp(value)', function() {
        it('should return a only read property object which pass to Object.defineProperty', function() {
            var prop = helpers.buildConstProp(1)
            expect(prop).to.eql({
                configurable: false,
                writable: false,
                value: 1
            })
        })
    })

    describe('#trim(str)', function() {
        it('should be trim and remove all \\u0000 char which in left and right', function() {
            var ori = '\u0000\u0000char\u0000'
            expect(helpers.trim(ori)).to.be('char')
        })
    })

    describe('#id2gf(fileId)', function() {
        it('should return a object which contains correct group and filename', function() {
            var gf = helpers.id2gf('group1/M00/00/00/wKgAalHctyGAIpSuAAAFxYHYCdQ59-part3.conf')
            expect(gf).to.eql({
                group: 'group1',
                filename: 'M00/00/00/wKgAalHctyGAIpSuAAAFxYHYCdQ59-part3.conf'
            })
        })
    })
})