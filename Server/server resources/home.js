//Handles all server comunications
//serverURL has to be the plain server domain, no protocolo at the beggining
function Server(serverURL){
	this.webSocket = new WebSocket("ws://"+serverURL);
	this.messageCallbacks = {};
	
	this.webSocket.onmessage = function(event){
		console.log("Game Server says: " + event.data);
		var filter = event.data.substr(0,event.data.indexOf(" "));
		var message = event.data.substr(event.data.indexOf(" ")+1);
		if(this.messageCallbacks[filter]){
			for(var i=0; i<this.messageCallbacks[filter].length; i++){
				this.messageCallbacks[filter][i](message);
			}
		}
	}.bind(this);
	
	this.webSocket.onopen = function(event){
		console.log("Connected to server");
	}.bind(this);
	
	this.webSocket.onclose = function(){
		
	}.bind(this);
	
	this.webSocket.onerror = function(event){
		
	}.bind(this);
	
	this.sendMessage = function(message){
		if(this.webSocket.readyState == 1){
			console.log("Sending message to WS: "+message);
			this.webSocket.send(message);
			return 1;
		}
		return 0;
	}
	
	this.register = function(filter,callback){
		if(this.messageCallbacks[filter] == undefined){
			this.messageCallbacks[filter] = [];
			this.messageCallbacks[filter].push(callback);
		}
	}
	
	
	this.requestCards = function(name){
		this.sendMessage("request_cards "+name);
	}
	
}

var server;

function onLoadHome(){
	//loadingURLs();
	startMatch();
	server = new Server(document.location.host);
	debugGlobalChat();
	window.server = server;
}





