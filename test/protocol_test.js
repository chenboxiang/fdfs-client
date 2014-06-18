/**
 * Author: chenboxiang
 * Date: 14-6-15
 * Time: 下午6:43
 */
'use strict'

var expect = require('expect.js')
var protocol = require('../lib/protocol')

describe('protocol', function() {
    describe('#packHeader(command, bodyLength, status)', function() {
        it('should pack a correct protocol header', function() {
            var buffer = protocol.packHeader(1, 0x11223344, 0)
            expect(buffer.readUInt8(0)).to.be(0x00)
            expect(buffer.readUInt8(1)).to.be(0x00)
            expect(buffer.readUInt8(2)).to.be(0x00)
            expect(buffer.readUInt8(3)).to.be(0x00)
            expect(buffer.readUInt8(4)).to.be(0x11)
            expect(buffer.readUInt8(5)).to.be(0x22)
            expect(buffer.readUInt8(6)).to.be(0x33)
            expect(buffer.readUInt8(7)).to.be(0x44)
            expect(buffer.readUInt8(8)).to.be(0x01)
            expect(buffer.readUInt8(9)).to.be(0x00)
        })
    })

    describe('#packMetaData(metaData)', function() {
        it('should serialize structure meta to correct string which will be send to server', function() {
            var raw = protocol.packMetaData({meta1: 'test1', meta2: 'test2'})
            expect(raw).to.be('meta1\u0002test1\u0001meta2\u0002test2')
        })
    })

    describe('#parseMetaData(raw)', function() {
        it('should deserialize raw meta to correct structure meta', function() {
            var parsed = protocol.parseMetaData('meta1\u0002test1\u0001meta2\u0002test2')
            expect(parsed).to.eql({meta1: 'test1', meta2: 'test2'})
        })
    })
})