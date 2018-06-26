import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  listOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },

  header: {
    padding: 10,
    borderBottomColor: '#bababa',
    borderBottomWidth: 1
  },

  headerTimeTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },

  logo: { width: 100, height: 100 },

  input: {
    height: 40,
    backgroundColor: 'rgba(226, 226, 226, 0.6)',
    marginBottom: 10,
    color: 'rgb(45, 45, 45)',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#515151',
    paddingVertical: 10,
    height: 50,
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  },
  linkBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5
  },
  loginInputContainer: {
    width: width / 1.2,
    marginTop: 20
  },
  horizon: {
    // flex: 1,
    marginTop: 20,
    flexDirection: 'row'
  },
  horizonLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#515151'
  }
});

export default styles;
