/**
 * Created by GAZ on 6/26/16.
 */

var ZiggyClient = function ZiggyClient(config){
    this.config = config;
    this.sfs = null;
}

ZiggyClient.prototype = {
    init:function(){
        this.sfs = new SFS2X.SmartFox(this.config);
        this.sfs.logger.level = SFS2X.LogLevel.DEBUG;

        // Add event listeners
        this.sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, this.onConnection, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.USER_EXIT_ROOM, this.onRoomExited, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, this.config.onConnectionLost, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, this.onLoginError, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.LOGIN, this.config.onLogin, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, this.onRoomJoin, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.LOGOUT, this.onLogout, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, this.config.onResponse, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.SOCKET_ERROR, this.config.onSocketError, this);
        trace("SmartFox API version: " + this.sfs.version);
    },

    onConnection:function(event)
    {
        if (event.success) {
            trace("Connected to SmartFoxServer 2X!");
            if(this.token)
                this.login(this.token);
        }
        else
            trace("Connection failed: " + (event.errorMessage ? event.errorMessage + " (code " + event.errorCode + ")" : "Is the server running at all?"));
    },


    // onConnectionLost:function(event)
    // {
    //     alert("You have been disconnected; reason is: " + event.reason);
    // },

    onLoginError:function(event)
    {
        alert("Login error: " + event.errorMessage + " (code " + event.errorCode + ")");
    },
    onRoomJoin:function(event)
    {
        trace(event);
    },
    onRoomExited:function(event)
    {
        trace(event);
    },

    // onLogin:function(event)
    // {
    //     trace("Login successful!" +
    //         "\n\tZone: " + event.zone +
    //         "\n\tUser: " + event.user +
    //         "\n\tData: " + event.data);
    // },

    onLogout:function(event)
    {
        trace("Logout from zone " + event.zone + " performed!");
    },

    // onResponse:function(event)
    // {
    //     trace("Response: " + event.cmd);
    // },

    connect: function(){
        this.sfs.connect();
    },

    isConnected: function(){
        return this.sfs.isConnected();
    },

    login: function(token){
        this.sfs.send(new SFS2X.LoginRequest(token));
    },

    sit: function(type){
        // var params = new SFS2X.SFSObject();
        // params.putInt("n1", 26);
        // params.putInt("n2", 16);

        var params = new SFS2X.SFSObject();
        params.putUtfString("type", ""+type);
        this.sfs.send(new SFS2X.ExtensionRequest("z.SIT",params));
    },

    leave: function(){
        this.sfs.send(new SFS2X.ExtensionRequest("z.MOVE_TO_LOBBY"));
    },

    take: function(){
        this.sfs.send(new SFS2X.ExtensionRequest("z.5",{}));
    },

    pass: function(){
        this.sfs.send(new SFS2X.ExtensionRequest("z.3",{}));
    },

    play: function(card){

        var params = {};
        params.card = card.substring(1,card.length).replace('_','.');
        console.log(params);
        this.sfs.send(new SFS2X.ExtensionRequest("z.4",params));
    },
}