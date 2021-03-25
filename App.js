/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ListView,
  Button,
  Image,
  Modal,
  TouchableHighlight,
  ScrollView,
  PixelRatio,
} from 'react-native';

import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

import { FlatGrid } from 'react-native-super-grid';

import { SectionGrid } from 'react-native-super-grid';

import { SearchBar } from 'react-native-elements';

import { Spinner, ListItem, Separator } from 'native-base';

import image from './images/images';

import styles from './css/style';

import { createStackNavigator, createAppContainer, StackNavigator } from 'react-navigation';

import Orientation from 'react-native-orientation';

import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';

import { YellowBox } from 'react-native';

// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

var SQLite = require('react-native-sqlite-storage')

var db = SQLite.openDatabase({name: 'test.db', createFromLocation : "~data.db"}, this.openCB, this.errorCB);

class MainDisplay extends Component {
  componentDidMount(){
    Orientation.lockToLandscape();  
  }
  
  static navigationOptions = { title: 'Welcome', header: null };
  
  constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
        dataSource: ds.cloneWithRows([]),
        modalDisplay: false,
        LopSelector: "Lớp 8",
        LopId: 8,
        disabledButton: false,
    }

    var row = [];
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Lop', [], (tx, results) => {
        var len = results.rows.length;
        if(len == 1){
          this.setState({
            disabledButton: true,
          })
        }
        for (let i=0; i<len; i++){
          row.push(results.rows.item(i));
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(row),
        });
      });
    });
  }

  ClickMe(){
    this.props.navigation.navigate('Menu',{ClassId: this.state.LopId});
  }

  toggleModal(){
    this.setState({
      modalDisplay: !this.state.modalDisplay
    })
  }

  setPicker(name,id){
    this.setState({
      LopSelector: name,
      LopId: id,
    });
    this.toggleModal();
  }

  render() {
    return (
      <ImageBackground resizeMode='cover' source={require('./images/light-blue.png')} style={styles.theme}>
        <ImageBackground resizeMode='stretch' source={require('./images/bg1.gif')} style={styles.themeSup}>
          <View style={styles.main}>
            <TouchableOpacity onPress={() => this.ClickMe()} style={styles.start}>
              <Text style={{fontSize: 18, fontWeight: "bold", color:'white'}}>BẮT ĐẦU</Text>
            </TouchableOpacity>
            <View style={{marginTop: 10, width: 85}}>
              <Button disabled={this.state.disabledButton} onPress={() => this.toggleModal()} title={this.state.LopSelector}></Button>
            </View>
          </View>

          <Modal visible={this.state.modalDisplay} animationType={"fade"} transparent={true} onRequestClose={() => console.log('Close the requested')}>
            <View style={styles.modal}>
              <ListView
                noScroll={true}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => 
                  <TouchableHighlight onPress={() => this.setPicker(rowData.Name,rowData.id)} style={{paddingVertical: 4}}>
                    <Text>{rowData.Name}</Text>
                  </TouchableHighlight>
                }                     
              />
              <TouchableHighlight onPress={() => this.toggleModal()} style={{paddingVertical: 4}}>
                <Text style={{color: '#999'}}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </Modal>
        </ImageBackground>
      </ImageBackground>
      
    );
  }
}


//Màn hình danh sách chức năng
class MenuDisplay extends Component{
  componentDidMount(){
    //Orientation.lockToPortrait();  
    Orientation.lockToLandscape();  
  }

  static navigationOptions = { title: 'Danh sách chức năng', header: null };

  constructor(props){
    super(props)
    const {navigation} = this.props;
    const classId = navigation.getParam('ClassId','Nothing'); 
    this.state = {
        LopID: JSON.stringify(classId),
    }
  }

  ClickMe(route){
    this.props.navigation.navigate(route,{ID: this.state.LopID});
  }

  render() {
    const items = [
      { name: 'video', color: '#1abc9c', route:'video' },
      { name: 'bth', color: '#2ecc71', route:'BTH' },
      { name: 'back', color: '#c0392b', route:'Start' },
      
      { name: 'chemist', color: '#3498db', route:'Main' },
      { name: 'back', color: '#c0392b', route:'Start' },
    ];

    return (
      <SectionGrid
        itemDimension={90}
        sections={[
          {
            title: 'Kiến thức hóa học',
            data: items.slice(0, 3),
          },
          {
            title: 'Thí nghiệm hóa học',
            data: items.slice(3, 6),
          },
        ]}
        style={styles.gridView}
        renderItem={({ item, section, index }) => (
          <TouchableOpacity onPress={() => this.ClickMe(item.route)} style={[styles.itemContainer, { backgroundColor: item.color }]}>
            {/* <Text style={styles.itemName}>{item.name}</Text> */}
            <Image style={styles.itemImage} resizeMode="stretch" source={image[item.name]} ></Image>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
      />
    );
  }
}

//Màn hình video hóa học
class Video extends Component{
  componentDidMount(){
    Orientation.lockToLandscape(); 
  }
  static navigationOptions = { title: 'Video', header: null };

  
  ClickMe(id){
    this.props.navigation.navigate('YTB',{ID: id});
  }
  render() {
    const items = [
      { name: 'Al2 + O2', color: '#1abc9c', videoId: 'zUw58ePEYLw' }, 
      { name: 'Fe + O2', color: '#2ecc71', videoId: 'PdckwbNPTa8' },
      { name: 'Cu + O2', color: '#FFCC66', videoId: '3SvldKOFmVQ' },
      { name: 'Fe + HCl', color: '#6699FF', videoId: 'y5xgGJYe7d0' },
      { name: 'Mg + O2', color: '#FF66FF', videoId: 'mf-HwamXl1o' },
      { name: 'Na + O2', color: '#999933', videoId: 'fiKXxpoSAno' },
      { name: 'P + O2', color: '#CC66CC', videoId: 'FA_HrcVH1yE' },
      { name: 'S + O2', color: '#336666', videoId: '_dZSwHoRkSk' },
      { name: 'Zn + HCl', color: '#6600FF', videoId: 'P_r5qaZS7kw' },
    ];

    return (
      <FlatGrid
        itemDimension={130}
        items={items}
        style={styles.gridView}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={[styles.itemContainer, { backgroundColor: item.color }]} onPress={() => this.ClickMe(item.videoId)}>
            <Text style={styles.itemName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    );
  }
}

//Màn hình play youtube video
class Youtube extends Component{
  componentDidMount(){
    Orientation.lockToLandscape(); 
  }
  
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const ytbID = navigation.getParam('ID','Nothing'); 
    YellowBox.ignoreWarnings(
 
       ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
       
     ]);

    this.state = {
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: true,
      isLooping: true,
      duration: 0,
      currentTime: 0,
      fullscreen: true,
      containerMounted: false,
      containerWidth: null,
      youtubeID: ytbID,
    }
  
  }
  

  render(){
    return(
      <ScrollView
        style={styles.YTBcontainer}
        onLayout={({ nativeEvent: { layout: { width } } }) => {
          if (!this.state.containerMounted) this.setState({ containerMounted: true });
          if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
        }}
      >
        {this.state.containerMounted && (
          <YouTube
            ref={component => {
              this._youTubeRef = component;
            }}
            apiKey="AIzaSyBcnRB56n4i8T2u7jJE6hNxubUaqyGdmKA"
            videoId= {this.state.youtubeID}
            play={this.state.isPlaying}
            loop={this.state.isLooping}
            fullscreen={this.state.fullscreen}
            controls={1}
            style={[
              { height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9)) },
              styles.player,
            ]}
            onError={e => this.setState({ error: e.error })}
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onChangeFullscreen={e => this.setState({ fullscreen: e.isFullscreen })}
            onProgress={e => this.setState({ duration: e.duration, currentTime: e.currentTime })}
          />
        )}

        <Text style={styles.instructions}>
          {this.state.isReady ? 'Player is ready' : 'Player setting up...'}
        </Text>
        <Text style={styles.instructions}>Status: {this.state.status}</Text>
        <Text style={styles.instructions}>Quality: {this.state.quality}</Text>
      </ScrollView>
    );
  }
}


//Màn hình bảng tuần hoàn
class Mendeleev extends Component{
  componentDidMount(){
    Orientation.lockToLandscape(); 
  }
  static navigationOptions = { title: 'Bảng tuần hoàn', header: null };

  goToHome(){
    this.props.navigation.navigate('Menu');
  }

  goToSearchPage(){
    this.props.navigation.navigate('Search');
  }

  render(){
    return(
      <View>
        <Image style={{width: '100%', height: '100%'}} resizeMode="stretch" source={require('./images/bth.png')} ></Image>
        {/* Home button */}
        <TouchableOpacity style={styles.bthhome} onPress={() => this.goToHome()}>
          <Image style={{width: 40, height: 40}} resizeMode="stretch" source={require('./images/home.png')} ></Image>
        </TouchableOpacity>

        {/* Search button */}
        <TouchableOpacity style={styles.bthsearch} onPress={() => this.goToSearchPage()}>
          <Image style={{width: 40, height: 40}} resizeMode="stretch" source={require('./images/search.png')} ></Image>
        </TouchableOpacity>
        
      </View>
    );
  }
}

//Màn hình search thông tin bảng tuần hoàn
class SearchPage extends Component {
  static navigationOptions = { title: 'Tìm kiếm chất', header: null};

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      search: '',
      data: [],
      error: null,
    };
  }

  async componentDidMount(){
    const { search } = this.state;
    await this.fetchData(search);
  }

  async handleSearch (value){
    this.setState({ search: value});
    await this.fetchData(value);
  }

  fetchData(search) {
    var row = [];
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM BTHHH WHERE name LIKE "%' + search + '%"' , row, (tx, results) => {
        if(results.rows.length > 0){
          for(let i = 0; i < results.rows.length; i++){
            row.push(results.rows.item(i));
          }
          this.setState({
            data: row
          });
        }
      });
    });
    
  }

  render() {
    if(this.state.loading){
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner color="green"></Spinner>
        </View>
      );
    }

    const listItem = this.state.data.map((item) =>
        <View key={item.id}>
          <Collapse style={{ marginBottom: 5, marginTop: 5 }}>
            <CollapseHeader>
              <Separator bordered>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, color: '#000000' }}>{item.name}</Text>
                </View>
              </Separator>
            </CollapseHeader>
            <CollapseBody>
              <ListItem style={{ marginBottom: 3, marginTop: 3 }}>
                <Text><Text> Ký hiệu : </Text>{item.id}</Text>
              </ListItem>
              <ListItem style={{ marginBottom: 3, marginTop: 3 }}>
                <Text><Text> Nguyên tử khối : </Text>{item.NTKTB}</Text>
              </ListItem>
              <ListItem style={{ marginBottom: 3, marginTop: 3 }}>
                <Text><Text> Số hiệu nguyên tử : </Text>{item.SHNT}</Text>
              </ListItem>
            </CollapseBody>
        </Collapse>
      </View>
    );

    return (
      <View>
        <SearchBar
            platform={"android"}
            placeholder="Search by name"
            onChangeText={(val) => this.handleSearch(val)} value={this.state.search} value={this.state.search}
            containerStyle={{ backgroundColor: '#F8FBFD', borderColor: '#fff', borderWidth: 2, marginTop: 10 }}
            placeholderTextColor={'#2B2F33'}
        />

        <ScrollView >
          <View>
              {listItem}
          </View>
        </ScrollView>

      </View>
    );
  }
}

//Màn hình phản ứng hóa học
class Supp extends Component {
  componentDidMount(){
    Orientation.lockToLandscape();  
  }
  static navigationOptions = { title: 'Thí nghiệm hóa học', header: null };
  
  constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    const {navigation} = this.props;
    const classId = navigation.getParam('ID','Nothing'); 
    this.state = {
        dataSourceA: ds.cloneWithRows([]),
        dataSourceB: ds.cloneWithRows([]),
        finalResult: ' ',
        isLoading: false,
        chatASelection: null,
        chatBSelection: null,
        dieukien: ' ',
        kq2: ' ',
        kq3:' ',
        kq4:' ',
        imageA: 'a',
        imageB: 'b',
        modalADisplay: false,
        modalBDisplay: false,
        disabledB: true,
        imagePlus: require('./images/plus.png'),
        LopID: JSON.stringify(classId),
    }

    var row = [];
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM ChatA WHERE Used = 1 and MaLop <= '+ this.state.LopID +'', [], (tx, results) => {
        var len = results.rows.length;
        for (let i=0; i<len; i++){
          row.push(results.rows.item(i));
        }
        this.setState({
          dataSourceA: this.state.dataSourceA.cloneWithRows(row),
        });
      });
    });
  }

  errorCB(err) {
    console.log("SQL Error: " + err);
  }

  successCB() {
    console.log("SQL executed fine");
  }

  openCB() {
    console.log("Database OPENED");
  }

  ClickMe(){
    this.props.navigation.navigate('Menu');
  }


  toggleChatA(){
    this.setState({
      modalADisplay: !this.state.modalADisplay,
    })
  }

  toggleChatB(){
    this.setState({
      modalBDisplay: !this.state.modalBDisplay,
    })
    var row = [];
    db.transaction((tq) => {
      var sql = 'SELECT b.* FROM ChatA a, ChatB b WHERE b.Used = 1 and b.MaLop <= '+ this.state.LopID +' and b.Aid = a.id and a.id = \''+ this.state.chatASelection +'\'';
      tq.executeSql(sql,[],(tq,results) => {
          var len = results.rows.length;
          for (let i=0; i<len; i++){
            row.push(results.rows.item(i));
          }
          this.setState({
            dataSourceB: this.state.dataSourceB.cloneWithRows(row),
          });
        });
    });
  }

  setPickerChatA(id){
    this.setState({
      chatASelection: id,
      imageA: id,
      disabledB: false,
    });
    this.toggleChatA();
  }

  setFinalResult(){
    db.transaction((tw) => {
      var sql = 'SELECT kq.* FROM ChatA a, ChatB b, KetQua kq WHERE kq.Used = 1 and kq.Aid = a.id and kq.Bid = b.id and a.id = \''+this.state.chatASelection+'\' and b.id = \''+this.state.chatBSelection+'\'';
      tw.executeSql(sql,[],(tw,results) => {
        var len = results.rows.length;
        if(len > 0){
          var row = results.rows.item(0);
          this.setState({
            finalResult: row.kq1,
            dieukien: row.DMid,
            kq2: row.kq2,
            kq3: row.kq3,
            kq4: row.kq4,
            imageA: "",
            imageB: "",
            imagePlus: null,
          });
        }
        });
    });
  }

  setPickerChatB(id){
    this.setState({
      chatBSelection: id,
      imageB: id,
    });
    this.setFinalResult();
    this.toggleChatB();
    
  }

  resetState() {
    this.setState({
      finalResult: ' ',
      isLoading: false,
      chatASelection: null,
      chatBSelection: null,
      modalADisplay: false,
      modalBDisplay: false,
      disabledB: true,
      imageA: 'a',
      imageB: 'b',
      imagePlus: require('./images/plus.png'),
    });
  }

  render() {
    return (
      <View style={styles.container}>

        {/* Hinh cai ban */}
        {/* <Image resizeMode="stretch" source={require('./images/table.jpg')} style={styles.table}></Image> */}
        
        {/* Reset button */}
        <TouchableOpacity style={styles.reset} onPress={() => this.resetState()}>
          <Image style={{width: 40, height: 40}} resizeMode="stretch" source={require('./images/rr.png')} ></Image>
        </TouchableOpacity>

        {/* Home button */}
        <TouchableOpacity style={styles.home} onPress={() => this.ClickMe()}>
          <Image style={{width: 40, height: 40}} resizeMode="stretch" source={require('./images/home.png')} ></Image>
        </TouchableOpacity>

        {/* Button chon chat A */}
        <View style={styles.chata}>
          <TouchableOpacity onPress={() => this.toggleChatA()}>
            <Image style={styles.imageSize} resizeMode="stretch" source={image[this.state.imageA]} ></Image>
          </TouchableOpacity>
        </View>

        {/* Dau cong */}
        <View style={styles.viewCong}>
          {/* <Text style={{fontSize: 40, color: 'black'}}>{this.state.LopID}</Text>   */}
          <Image style={{width:35, height: 35}} resizeMode="stretch" source={this.state.imagePlus} ></Image>
        </View>

        {/* Button chon chat B */}
        <View style={styles.chatb}>
          <TouchableOpacity disabled={this.state.disabledB} style={this.state.disabledB?styles.disabled:styles.enabled} onPress={() => this.toggleChatB()}>
            <Image style={styles.imageSize} resizeMode="stretch" source={image[this.state.imageB]} ></Image>
          </TouchableOpacity>
        </View>
        
        {/* Hien ket qua  */}
        <View style={styles.result}>
          <Image style={styles.resultSize} resizeMode="stretch" source={image[this.state.finalResult]} ></Image>
        </View>

        {/* Modal chat A */}
        <Modal visible={this.state.modalADisplay} animationType={"fade"} transparent={true} onRequestClose={() => console.log('Close the requested')}>
          <View style={styles.modalA}>
            <Text style={{fontWeight: 'bold', marginBottom: 20}}>
              Chọn chất
            </Text>
            <ListView
              noScroll={true}
              enableEmptySections={true}
              dataSource={this.state.dataSourceA}
              renderRow={(rowData) => 
                <TouchableHighlight onPress={() => this.setPickerChatA(rowData.id)} style={{paddingVertical: 4}}>
                  <Text>{rowData.id}</Text>
                </TouchableHighlight>
              }                     
            />
            <TouchableHighlight onPress={() => this.toggleChatA()} style={{paddingVertical: 4}}>
              <Text style={{color: '#999'}}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </Modal>
        
        {/* Modal chat B */}
        <Modal visible={this.state.modalBDisplay} animationType={"fade"} transparent={true} onRequestClose={() => console.log('Close the requested')}>
          <View style={styles.modalB}>
            <Text style={{fontWeight: 'bold', marginBottom: 20}}>
              Chọn chất
            </Text>
            <ListView
              noScroll={true}
              enableEmptySections={true}
              dataSource={this.state.dataSourceB}
              renderRow={(rowData) => 
                <TouchableHighlight onPress={() => this.setPickerChatB(rowData.id)} style={{paddingVertical: 4}}>
                  <Text>{rowData.id}</Text>
                </TouchableHighlight>
              }                     
            />
            <TouchableHighlight onPress={() => this.toggleChatB()} style={{paddingVertical: 4}}>
              <Text style={{color: '#999'}}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Start: {
      screen: MainDisplay,
    },
    Menu: {
      screen: MenuDisplay,
    },
    BTH:{
      screen: Mendeleev,
    },
    YTB:{
      screen:Youtube,
    },
    video:{
      screen: Video,
    },
    Main: {
      screen: Supp,
    },
    Search: {
      screen: SearchPage,
    },
  },
  {
    initialRouteName: 'Start',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
