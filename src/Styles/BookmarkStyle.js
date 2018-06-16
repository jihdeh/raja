import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mediaConatiner: {
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 3,
    marginLeft: 8,
    marginTop: 8,
    marginHorizontal: 3
  },
  image: { height: 50, width: 50, margin: 5, borderRadius: 5 },
  description: {
    height: 50
  },
  section: {
    flexDirection: 'row'
  },
  sectionTextLayer: {
    flexDirection: 'column',
    marginTop: 10
  },
  divider: {
    borderBottomColor: '#bababa',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10
  }
});

export default styles;
