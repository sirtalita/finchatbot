new Vue({
    el: '#app',
    data: {
      chats: [],
    },
    created() {
        let pusher = new Pusher('7694ae9785ee526b3fa1', {
          cluster: 'ap2',
          useTLS: true
        });

        const channel = pusher.subscribe('bot');
        channel.bind('bot-response', data => {
          const response = {
            speech: data.speech,
            query: data.query
          }
          this.chats.push(response);
        });
      },
    methods: {

      sendChat(event) {
        const chatMessage = event.target.value;

        if(event.keyCode === 13 && !event.shiftKey) {
          const chat = {
            message: chatMessage
          };

          event.target.value = "";

          axios.post('/', chat)
          .then( data => {
            console.log(data);
          });
        }
      }
    }
  })

  /**
   * initialising the chat room by creating a new Vue instance with the Vue function
   */