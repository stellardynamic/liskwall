$(document).ready(function() {
  init();
});

function init(){
	//retrieve message after the page is loaded and setInterval to retrieve any new 
	retrieveMessages()
	setInterval(retrieveMessages,10000);
	
};

function retrieveMessages(){
//retrieve data fields content from the last 10 transactions from an address, and make html code save to display.
const testnetClient=lisk.APIClient.createTestnetAPIClient();
$("#messages").html("");
testnetClient.transactions.get({recipientId:'7134531444980378449L', limit:10, offset:0, sort: 'timestamp:desc' })
	.then(output => { 
	
			for (var i = 9; i >= 0; i--) {
				var fixedData=(output.data[i].asset.data);
					fixedData=fixedData.replace(/>/g, "&gt;").replace(/</g, "&lt;");
					$("#messages").append("<p>"+fixedData+"</p>");
			}
		}
	)
	.catch(console.error);
};
