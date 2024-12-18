import './createPost.js';
import { Devvit, useState } from '@devvit/public-api';

// Defines the messages that are exchanged between Devvit and Web View
type WebViewMessage =
  | {
    type: 'initialData';
    data: { username: string };
  };

Devvit.configure({
  redditAPI: true,
  redis: true,
});

// Add a custom post type to Devvit
Devvit.addCustomPostType({
  name: 'Slangman',
  height: 'tall',
  render: (context) => {
    const [directions, setDirections] = useState(0)
    // Load username with `useAsync` hook
    const [username] = useState(async () => {
      const currUser = await context.reddit.getCurrentUser();
      return currUser?.username ?? 'anon';
    });

    // Create a reactive state for web view visibility
    const [webviewVisible, setWebviewVisible] = useState(false);

    // When the web view invokes `window.parent.postMessage` this function is called
    const onMessage = async (msg: WebViewMessage) => {
      switch (msg.type) {
        case 'initialData':
          break;

        default:
          throw new Error(`Unknown message type: ${msg satisfies never}`);
      }
    };

    // When the button is clicked, send initial data to web view and show it
    const onShowWebviewClick = () => {
      setWebviewVisible(true);
      context.ui.webView.postMessage('myWebView', {
        type: 'initialData',
        data: {
          username: username,
        },
      });
    };

    // Render the custom post type
    return (
      <vstack grow padding="small">
        <vstack
          grow={!webviewVisible}
          height={webviewVisible ? '0%' : '100%'}
          alignment="middle center"
        >
          <image
            url="logo.png"
            description="logo"
            imageHeight={256}
            imageWidth={256}
            height="250px"
            width="250px"
          />
           <vstack alignment="start middle">
            <hstack>
              <text size="medium">Hey, </text>
              <text size="medium" weight="bold">
                {' '}
                {username ?? ''}
      Ready to play? </text>
            </hstack>
          </vstack>
          <spacer />
          <button icon="play-outline" onPress={onShowWebviewClick}>PLAY  
          </button>

          <spacer />
          <button icon="info-outline" onPress={() => setDirections(directions => directions + 1)}
        >
          DIRECTIONS
        </button>
        <spacer />
        {directions ? (
         <text wrap
          > Guess the word one letter at a time.
          Use the hint to guide you!</text>
        ) : (
          <text>&nbsp;</text>
        )}
        </vstack>
        <vstack grow={webviewVisible} height={webviewVisible ? '100%' : '0%'}>
          <vstack border="thick" borderColor="black" height={webviewVisible ? '100%' : '0%'}>
            <webview
              id="myWebView"
              url="index.html"
              onMessage={(msg) => onMessage(msg as WebViewMessage)}
              grow
              height={webviewVisible ? '100%' : '0%'}
            />
          </vstack>
        </vstack>
      </vstack>
    );
  },
});

export default Devvit;