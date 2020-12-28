import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

console.disableYellowBox = true
console.ignoredYellowBox = ['Warning: `flexWrap: `wrap``'];

const reactotron = Reactotron
  .configure({ host: "192.168.1.7" }) // controls connection & communication settings
  .use(reactotronRedux())
  .connect() // let's connect!
export default reactotron
//console.tron = Reactotron
