// liskwall by korben3 - sept-2018 - V0.3

$(document).ready(function() {
  init();
});

var timestamp; 

function init(){
	//retrieve message after the page is loaded and setInterval to retrieve any new 
	retrieveMessages()
	setInterval(retrieveMessages,10000); 
};

function convertTimestamp(timestampOld){
	var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	
	const epoch=lisk.constants.EPOCH_TIME;
	var d=new Date((((Date.parse(epoch)/1000)+timestampOld)*1000));
    timestampNew=d.getDate()+" "+ months[(d.getMonth())]+" "+d.getHours()+':'+d.getMinutes();
	return timestampNew;
}

function retrieveMessages(){
	//retrieve data fields content from the last 10 transactions from an address, and make html code safe to display.
	const testnetClient=lisk.APIClient.createTestnetAPIClient();
	//$("#messages").html("");

	testnetClient.transactions.get({recipientId:'7134531444980378449L', limit:12, offset:0, sort: 'timestamp:asc' })
		.then(output => { 
		
			//only clear field and display messages when new messages are available
			if (timestamp!=(output.data[0].timestamp)){
				$("#messages").html("")
				//console.log(output);
				for (var i = 11; i >= 0; i--) {
					var postMessage=output.data[i].asset.data;
					if(postMessage){
						postMessage=postMessage.replace(/>/g, "&gt;").replace(/</g, "&lt;");
						postMessage=postMessage.replace(/\:\)/g, "🙂").replace(/\:\(/g, "☹️"); //allow emoticons :),:(
						postMessage=postMessage.replace(/\+1/g, "👍").replace(/\-1/g, "👎"); //allow emoticons +1,-1
						timestamp=output.data[i].timestamp;
						var postDate=convertTimestamp(timestamp);
						var postAddress=output.data[i].senderId;
						
						$("#messages").append("<p><sup>"+postDate+" - "+postAddress+"</sup><br/>"+postMessage+"</p>");
					}
				}
			}
		}
	)
	.catch(console.error);
};
