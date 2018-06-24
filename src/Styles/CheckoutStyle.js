import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 30
  },
  contOne: {
    flex: 1,
    marginBottom: 20,
    justifyContent: 'space-around'
  },
  contTwo: {
    flex: 1,
    marginTop: 10
  },
  scrollable: {
    flex: 1
  },
  itemCont: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30,
    height: height / 12
  },
  imageCont: { flex: 1 },
  imageItem: { height: '100%', width: '100%', borderRadius: 10 },
  detailCont: { flex: 3, paddingLeft: 20, justifyContent: 'space-between' },
  lbl: {
    marginRight: 20,
    marginBottom: 5,
    color: 'rgba(0,0,0,.5)',
    fontWeight: 'bold',
    fontSize: 13
  },
  lblCont: { flexDirection: 'row' },
  toplbl: {
    fontWeight: 'bold',
    fontSize: 13
  },
  detailOne: {
    justifyContent: 'space-between'
  },
  lblHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  lbltitle: {
    fontWeight: 'bold',
    fontSize: 13
  },
  lblevnt: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#ff5252'
  },
  lowCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  evtbtn: {
    flex: 1,
    backgroundColor: '#ff5252',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 55,
    marginTop: 25,
    marginBottom: 35
  },
  evntTxt: { color: 'white', fontWeight: 'bold' },
  noEmph: { color: 'rgba(0,0,0,.5)', fontWeight: 'bold' },
  emph: {
    fontWeight: 'bold'
  },
  mEmph: {
    fontSize: 17,
    fontWeight: 'bold'
  }
});

export default styles;
