import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    disabled: {
      opacity: 0.5
    },
  
    enabled: {
      opacity: 1
    },
    main: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    theme:{
      marginBottom: -90,
      height: 400,
      
      width: '100%',
      flex:1,
    },
    themeSup:{
      height: '100%',
      width: '100%',
      flex:1,
    },
    start: {
      padding: 10,
      paddingLeft: 50,
      paddingRight: 50,
      backgroundColor: '#FF3333',
      borderRadius: 5,
      alignItems: "center",
      marginTop: -200,
      borderWidth: 3,
      borderColor: "white"
    },
    reset: {
      position: "absolute",
      top: 10,
      left: 10,
      zIndex: 999,
    },
    home: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 999,
    },
    table: {
      width: 750,
      height: 300,
      alignContent: "center",
      top: 120,
      position: "absolute",
    },
    container: {
      flex: 1,
      alignItems:"center",
      backgroundColor: '#66CCFF',
    },
    viewCong: {
      position: "absolute",
      marginTop: 150,
      left: 300,
    },
    chata: {
      position: "absolute",
      marginTop: 95,
      left: 120,
    },
    chatb: {
      position: "absolute",
      marginTop: 95,
      left: 380,
    },
    result: {
      position: "absolute",
      marginTop: 0,
      zIndex:998,
      //left: 150,
    },
    modal: {
      marginTop: 157,
      marginLeft:277,
      height: 150,
      width: 85,
      padding: 20,
      alignItems: "center",
      position: "absolute",
      backgroundColor: "lightblue"
    },
    modalA: {
      marginTop: 50,
      marginLeft:120,
      height: 250,
      padding: 20,
      alignItems: "center",
      position: "absolute",
      backgroundColor: "#efefef",
      borderRadius: 20,
    },
    modalB: {
      marginTop: 50,
      marginLeft:400,
      height: 250,
      padding: 20,
      alignItems: "center",
      position: "absolute",
      backgroundColor: "#efefef",
      borderRadius: 20,
    },
    imageSize:{
      width: 140,
      height: 130,
    },
    resultSize:{
      // width: 300,
      // height:250,
      width: 700,
      height:340,
    },

    //Màn hình danh sách chức năng
    gridView: {
      marginTop: 20,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'center',
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 14,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
    sectionHeader: {
      flex: 1,
      fontSize: 15,
      fontWeight: '600',
      alignItems: 'center',
      backgroundColor: '#636e72',
      color: 'white',
      padding: 10,
    },
    itemImage: {
      width: 75,
      height: 70,
    },

    //Màn hình bảng tuần hoàn
    bthhome: {
      position: "absolute",
      top: 20,
      right: 40,
    },

    bthsearch: {
      position: "absolute",
      top: 20,
      left: 80,
    },


    //yotube style
    YTBcontainer: {
      backgroundColor: 'white',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    buttonGroup: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    button: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      alignSelf: 'center',
    },
    buttonText: {
      fontSize: 18,
      color: 'blue',
    },
    buttonTextSmall: {
      fontSize: 15,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    player: {
      alignSelf: 'stretch',
      marginVertical: 10,
    },
  });