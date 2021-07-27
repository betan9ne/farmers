import React,{useState, useEffect} from 'react'
import {Text, View,  TouchableOpacity, ScrollView, StyleSheet, Modal, Image, FlatList} from 'react-native'
import firebase from '../../firebase'
import { SIZES, FONTS, COLORS } from "../../constants"
import {useNavigation} from '@react-navigation/native'
import {Feather} from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker'
import uuid from "uuid"

const ViewProduct = ({route}) => {

    let navigation = useNavigation()
    let data = route.params.item
    const[url, setUrl] = useState(null)
    const[modalVisible, setModalVisibility] = useState(false)
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const[uploadUrl, setImageUrl] = useState()
    const[progress, setProgress] = useState(0)
    function DeleteItem()
    {
        firebase.firestore().collection("products").doc(data.id).delete().then(()=>{            
            console.log("deleted")
            navigation.goBack()
        })    
    }

    
    const pickImage = async (tag) => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });    
        console.log(result);
         if (!result.cancelled) {
            // setImage(result)
            UploadImageAndPost(result, tag)
        }
      };

     const UploadImageAndPost = async (result, tag) => {
        try {
         setUploading({ uploading: true }); 
         setModalVisibility(true)
          if (!result.cancelled) {
            const uploadUrl = await uploadImageAsync(result.uri, tag);
            setImageUrl({ image: uploadUrl });
          }
        } catch (e) {
          console.log(e);          
        } finally {
          setUploading({ uploading: false });
          setModalVisibility(false)
        }
      };
        
    async function uploadImageAsync(uri, tag) {      
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
    
      const ref = firebase.storage().ref().child(uuid.v4());
      const snapshot = await ref.put(blob)
    
      // We're done with the blob, close and release it     
      //blob.close();
    
      const url = await snapshot.ref.getDownloadURL();
      setUrl(url)
      console.log(url)
       if(url){
           addProduct(url, tag)
       }
       
      return url
    }



   function addProduct(url, tag){
        if(tag === 0)
        {
            firebase.firestore().collection("products").doc(data.id).update({images:url}).then(()=>{
              
            })
        }
        else{
        const arrayUnion = firebase.firestore.FieldValue.arrayUnion
        firebase.firestore().collection("products").doc(data.id).update({
            gallery: arrayUnion(url)
        }).then(()=>{
            
        })
    }
    }
    
    const renderItem = ({ item }) => (           
        <TouchableOpacity  style={{paddingVertical:10, borderRadius:10, backgroundColor:COLORS.white}}>
       <Image  style={{flex:1, height:220, borderRadius:10, resizeMode:'cover'}}
                source={{
                    uri: item,
                }}
                />
              
        </TouchableOpacity>
    )

    const[item, setItem] = useState(data)
    console.log(item)
    return (
        <ScrollView style={{backgroundColor:COLORS.white,}}>
           <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}         
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{...FONTS.h4}}>Uploading Image to galley</Text>
            <Text style={{textAlign:"center", ...FONTS.h6}}>Please do not leave page until upload is complete and prompt will disappear</Text>
              </View>
        </View>
      </Modal>

        <View style={{backgroundColor:COLORS.white, flex:1, padding:SIZES.padding*2}}>
            <View style={{height:250}}>
            {data.images ? <Image  style={{width:"100%", height:"100%", borderRadius:10, resizeMode:'cover'}}
                source={{
                    uri: data.images,
                }}
                /> : <View style={{justifyContent:"center", height:"100%", alignItems:"center"}}>
                    <TouchableOpacity onPress={()=>pickImage(0)} style={{padding:SIZES.padding}}><Text style={{...FONTS.h4}}>Add Poster Image</Text></TouchableOpacity>
                    </View>}
                </View> 
            <View style={{paddingTop:10, marginHorizontal:20, marginTop:-30, backgroundColor:COLORS.white, borderRadius:10,}}>
                <Text style={{color:COLORS.black, ...FONTS.h2,  textAlign:"center", fontWeight:"900"}}>{item.produce}</Text>
                <Text style={{color:COLORS.secondary, ...FONTS.h4, textAlign:"center", }}>{item.produce_category}</Text>
                <Text style={{color:COLORS.darkgray, ...FONTS.h6, textAlign:"center", }}>
                    {item.delivery === "0" ? "Stationary" : "Mobile"}
                    </Text>
                         
            </View>

            <View style={{flexDirection:"row", marginVertical:20}}>
            <TouchableOpacity onPress={()=>navigation.navigate("editProduct",{item})} style={{flex:1, borderRadius:10, padding:SIZES.padding*2, justifyContent:"center", alignItems:"center", backgroundColor:COLORS.dark, marginHorizontal:5}}>
                       <Feather name="edit" color="white" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>pickImage(1)} style={{flex:1, borderRadius:10, padding:SIZES.padding*2,justifyContent:"center", alignItems:"center", backgroundColor:COLORS.dark2, marginHorizontal:5}}>
                       <Feather name="image" color="white" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>DeleteItem()} style={{flex:1, padding:SIZES.padding*2, justifyContent:"center", alignItems:"center", borderRadius:10, backgroundColor:COLORS.black, marginHorizontal:5}}>
                        <Feather name="x" color="white" size={24} />
                    </TouchableOpacity>
                </View>    

            <View style={{flexDirection:"row", marginVertical:10}}>
                <View style={{flex:1, marginHorizontal:5,  padding:SIZES.padding*4,  borderRadius:10, justifyContent:"center", alignItems:"center", backgroundColor:COLORS.black}}>
                     <Text style={{color:COLORS.white, ...FONTS.h6, textAlign:"center", }}>Price</Text>
                    <Text style={{color:COLORS.white, ...FONTS.h2, textAlign:"center",}}>{item.price}</Text>
                </View>
                <View style={{flex:1, marginHorizontal:5, padding:SIZES.padding*4, borderRadius:10, justifyContent:"center", alignItems:"center", backgroundColor:COLORS.black}}>
                    <Text style={{color:COLORS.white, ...FONTS.h6, textAlign:"center", }}>Items available</Text>
                    <Text style={{color:COLORS.white, ...FONTS.h2, textAlign:"center", }}>{item.items}</Text>
                </View>
            </View>
            <Text style={{...FONTS.h4, marginVertical:20}}>Gallery</Text>
            {data &&  <FlatList
            data={data.gallery}
            veertical
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item}`}
                renderItem={renderItem}
                contentContainerStyle={{                    
                }}
            />  }
              </View>
     
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",      
      backgroundColor:'rgba(0,0,0,0.8)'
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 5,
      padding: 35,
      alignItems: "center",
        },
     });
export default ViewProduct
