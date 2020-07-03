import {StyleSheet} from 'react-native';
import Colors from '../../../res/styles/Colors';
import Sizes from '../../../res/styles/Sizes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: Sizes.height3,
  },
  textInput: {
    alignSelf: 'stretch',
    paddingHorizontal: Sizes.width2,
    marginHorizontal: Sizes.width5,
    marginVertical: Sizes.height1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: Colors.blue,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: Sizes.width5,
  },
  button: {
    marginVertical: Sizes.height1,
    padding: 5,
    width: Sizes.width30,
    height: Sizes.height5,
    borderWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: Colors.blue,
  },
});
