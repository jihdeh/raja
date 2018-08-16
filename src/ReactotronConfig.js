import Reactotron, { trackGlobalErrors } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron
  .configure({name: 'Juli'}) // controls connection & communication settings
  .use(reactotronRedux())
  .use(trackGlobalErrors())
  .connect() // let's connect!

  export default reactotron