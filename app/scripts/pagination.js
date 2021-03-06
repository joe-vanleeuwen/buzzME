function pagination(numOfMessages) {
	var query = new Parse.Query(MessageClass);
	query.limit(numOfMessages);
	query.descending('createdAt');
	if (allMessages.length) {
		query.lessThan('createdAt', allMessages.at(0).createdAt)
	}
	query.find({
 		success: function(messages) {
 			// getting initial difference of the height of chatbox and of its parent div. Returnin the overflow height.
 			var diff = getDiff();
 			// switchOrder is necessary to display messages in proper order. Most recent being in the bottom of the chat-box
 			var switchOrder = [];
 			// this will push previous messages to the back of switchOrder
 			allMessages.each(function(message) {
 				switchOrder.push(message);
 			});

 			// remove any previous messages from collection so as to not attempt to add identical messages. (Won't let you anyhow.)
 			allMessages.reset()
 			
 			// this will unshift the newly loaded set of messages so they will be displayed in the top of chat-box
 			messages.forEach(function(message) {
 				switchOrder.unshift(message);
 			});

 			// add all messages to the allMessages collection
			allMessages.add(switchOrder);

			// display all the messages in the chat-box
    		display(allMessages);

    		// scroll down to the top of the previous messages
    		scrollToPosition(getDiff() - diff)
  		},
  		error: function(allMessages, error) {
    		console.log('you blew it')
  		}
	});
};