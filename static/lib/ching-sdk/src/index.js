import _ from 'underscore';
import Playio from 'playio-client';

import events from './configs/events';



export default class Client {

    constructor (configs) {
        Playio.setServerConfig(configs);
        this.__playIo = new Playio();
        this.__roomId = null;

        this.roomEvents = this.__playIo.events.game.room;
        this.playerEvents = this.__playIo.events.game.player;
        this.socketEvents = this.__playIo.events.game.player;
        this.__roomCallbacks = {};

        this.figures = {
            STONE: 0,
            SCISSORS: 1, // mkrat
            PAPER: 2 // tuxt
        };
        }

    getClient () {
        return this.__playIo;
    }

    getRoom () {
        return this.__playIo.getRoom(this.__roomId);
    }

    getPlayer () {
        return this.__playIo.player;
    }

    login ({ playerId, token }) {
        return this.getClient().login({ playerId, token });
    }

    /** Listeners */

    /** Playio */

    onConnect (cb) {
        this.__playIo.on(this.socketEvents.CONNECT, cb);
    }

    onDisconnect (cb) {
        this.__playIo.on(this.socketEvents.DISCONNECT, cb);
    }

    /** Player */

    onPlayerSubscribe (cb, ctx) {
        this.getPlayer().onSubscribe(data => {

            if (data.status) {
                this.__roomId = data.room.id;
                this.__addRoomListeners();
                data.room.players = _.toArray(data.room.players);
            }

            cb.call(ctx, data);
        });
    }

    onPlayerJoinRoom (cb, ctx) {
        this.getPlayer().on(events.JOIN_ROOM, cb.bind(ctx));
    }


    /** Room */

    onGameStart (cb, ctx) {
        this.__roomCallbacks[this.roomEvents.GAME_START] = cb.bind(ctx);
    }

    onGameFinish (cb, ctx) {
        this.__roomCallbacks[this.roomEvents.GAME_FINISH] = cb.bind(ctx);
    }

    onMatchFinish (cb, ctx) {
        this.__roomCallbacks[this.roomEvents.MATCH_FINISH] = cb.bind(ctx);
    }

    onPlayerJoin (cb, ctx) {
        this.__roomCallbacks[this.roomEvents.JOIN] = cb.bind(ctx);
    }

    onPlayerLeave (cb, ctx) {
        this.__roomCallbacks[this.roomEvents.LEAVE] = cb.bind(ctx);
    }

    onPlayerReady (cb, ctx) {
        this.__roomCallbacks[this.roomEvents.READY] = cb.bind(ctx);
    }

    onPlayerNotReady (cb, ctx) {
        this.__roomCallbacks[this.roomEvents.NOT_READY] = cb.bind(ctx);
    }

    __addRoomListeners () {
        _.each(this.__roomCallbacks, (cb, eventName) => this.getRoom().on(eventName, cb));
    }

    /** Senders */

    /** Player */

    joinRoom (roomType) {
        this.getPlayer().send(events.JOIN_ROOM, { roomType });
    }

    leaveRoom () {
        return this.getPlayer().leaveRoom();
    }

    leaveWaitingRoom (roomType) {
        return this.getPlayer().send(events.LEAVE_ROOM, { roomType });
    }

    /** Room */
    ready (status) {
        const room = this.getRoom();
        return status ? room.ready() : room.notReady();
    }

    play ({ playerId, figure }) {
        this.getRoom().send(events.ROOM_PLAY, { playerId, figure });
    }

}
