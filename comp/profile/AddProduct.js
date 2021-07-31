import React,{useState, useEffect} from 'react'
import {Text, View,  TouchableOpacity, Modal, StyleSheet, ScrollView, TextInput, Platform, FlatList} from 'react-native'
import firebase from '../../firebase'
import { SIZES, FONTS, COLORS } from "../../constants"
import {useNavigation} from '@react-navigation/native'
import {Feather} from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker'
import uuid from "uuid"

function AddProduct() {
    const[price, setPrice]= useState(null)
    const[items, setItems]= useState(null)
    const[quantity, setQuantity]= useState(null)
    const[unit, setUnit]= useState(null)
    const[delivery, setDelivery]= useState(null)
    const[doc, setDocs] = useState(null)
    const[subItems, setSubItems] = useState(null)
    const[subItem, setSubItem] = useState(null)
    const[ItemName, setItemname] = useState(null)
    const[url, setUrl] = useState(null)
    const[modalVisible, setModalVisibility] = useState(false)

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const[uploadUrl, setImageUrl] = useState()

  let unitOfMeasure = ["Kilogram","Grams","Liters", "Mililiters","Per Head", "Box"]

    const navigation = useNavigation()

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

    useEffect(() => {
        firebase.firestore().collection("produce").get().then((doc)=>{
            let data = []
            doc.docs.forEach(e=>{
                let asd = {
                    id:e.id,
                    ...e.data()
                }
                data.push(asd)
            })
            setDocs(data)
        })
    }, [])


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });    
        console.log(result);
         if (!result.cancelled) {
             setImage(result)
          //_handleImagePicked(result)
        }
      };

     const UploadImageAndPost = async () => {
        try {
         setUploading({ uploading: true }); 
         setModalVisibility(true)   
          if (!image.cancelled) {
            const uploadUrl = await uploadImageAsync(image.uri);
            setImageUrl({ image: uploadUrl });
          }
        } catch (e) {
          console.log(e);          
        } finally {
          setUploading({ uploading: false });
          setModalVisibility(false)
        }
      };
        
    async function uploadImageAsync(uri) {      
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
      const snapshot = await ref.put(blob);    
      // We're done with the blob, close and release it     
      //blob.close();
    
      const url = await snapshot.ref.getDownloadURL();
      setUrl(url)
      console.log(url)
       if(url){
           addProduct(url)
       }
      return url
    }

   function addProduct(url){
        
            let asd = {
                produce_category : ItemName,
                produce: subItem,
                createdAt: new Date(Date.now()).toString(),
                price: price,
                items: items,
                delivery: delivery, 
                images:url,  
                unit:unit,
                quantity:quantity,            
                u_id:firebase.auth().currentUser.uid,
            }
            firebase.firestore().collection("products").add(asd).then(()=>{
                console.log("Item added")
                navigation.goBack()
            }).catch((e)=>{
                console.log(e)
            })
        
    }
    
    function displayItems(item){
        console.log(item.name)
        setItemname(item.name)
        setSubItem(null)
        setSubItems(item.items)
    }

    const renderItem = ({ item }) => (           
        <TouchableOpacity onPress={()=>displayItems(item)} style={{paddingVertical:10,marginHorizontal:5, borderRadius:10, backgroundColor:item.name === ItemName ? COLORS.secondary : COLORS.black}}>
            <Text style={{paddingHorizontal:20, color:COLORS.white}}>{item.name}</Text>
        </TouchableOpacity>
    )

    const renderUnit = ({ item }) => (           
      <TouchableOpacity onPress={()=>setUnit(item)} style={{paddingVertical:10,marginHorizontal:5, borderRadius:10, backgroundColor:item === unit ? COLORS.secondary : COLORS.black}}>
          <Text style={{paddingHorizontal:20, color:COLORS.white}}>{item}</Text>
      </TouchableOpacity>
  )
    const renderSubItem = ({ item }) => (           
        <TouchableOpacity onPress={()=>setSubItem(item)} style={{paddingVertical:10,marginHorizontal:5, borderRadius:10, backgroundColor: item === subItem ? COLORS.white : COLORS.lightGray}}>
            <Text style={{paddingHorizontal:20, color:COLORS.black}}>{item}</Text>
        </TouchableOpacity>
    )

    return (
        <ScrollView style={{backgroundColor:COLORS.white, flex:1}}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}         
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{...FONTS.h4, textAlign:"center"}}>Thank you, we are adding details to the database</Text>
            <Text style={{textAlign:"center", ...FONTS.h6}}>Please do not leave the page until upload is complete and prompt will disappear</Text>
              </View>
        </View>
      </Modal>
      <View style={{backgroundColor:COLORS.white, padding:SIZES.padding*2}}>
            <Text style={{...FONTS.h5}}>Add a product to your catalogue for buyers to see what you have in stock.</Text>
            
            <View style={{marginTop:30,}}>
                <Text  style={{...FONTS.h5, marginVertical:10}}>Select a  category and produce name below</Text>
               {doc &&  <FlatList
            data={doc}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{                    
                }}
            />  }
            <View style={{height:20}}></View>
                 {subItems &&  <FlatList
            data={subItems}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item}`}
                renderItem={renderSubItem}
                contentContainerStyle={{                    
                }}
            />  }
                <Text style={{...FONTS.h5, marginVertical:10}}>Add Cover image</Text>
                <TouchableOpacity onPress={()=>pickImage()} style={{borderRadius:10,paddingVertical:10, marginHorizontal:5, backgroundColor:COLORS.black}}><Text style={{color:COLORS.white, textAlign:"center", padding:SIZES.padding, ...FONTS.h5}}>Add Images</Text></TouchableOpacity> 
                <Text style={{...FONTS.h5, marginTop:10, color:COLORS.black}}>Quantity</Text>
                <TextInput keyboardType="number-pad" placeholder="How many per unit" onChangeText={(value)=>setQuantity(value)} style={{padding: SIZES.padding*2, }} />
                <Text style={{...FONTS.h5, marginTop:10, color:COLORS.black, marginBottom:10}}>Unit of Measure</Text>
                <FlatList
            data={unitOfMeasure}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item}`}
                renderItem={renderUnit}
                contentContainerStyle={{                    
                }}
            /> 
                <Text style={{...FONTS.h5, marginTop:10, color:COLORS.black}}>Price</Text>
                <TextInput keyboardType="number-pad" placeholder="How much does it cost" onChangeText={(value)=>setPrice(value)} style={{padding: SIZES.padding*2,}} />
                <Text style={{...FONTS.h5, marginTop:10}}>Items Available</Text>
                <TextInput keyboardType="number-pad" placeholder="What do you have available" onChangeText={(value)=>setItems(value)} style={{padding: SIZES.padding*2,}} />
                <Text style={{...FONTS.h5, marginTop:10}}>Do you offer delivery?</Text>
                <View style={{flexDirection:"row", marginTop:10}}>
                    <TouchableOpacity onPress={()=>setDelivery("0")} style={{flex:1, borderRadius:10, marginHorizontal:5, backgroundColor: delivery === "0" ? COLORS.secondary : COLORS.black}}><Text style={{color:COLORS.white, textAlign:"center", padding:SIZES.padding, ...FONTS.h5}}>Stationary</Text></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>setDelivery("1")} style={{flex:1, borderRadius:10, marginHorizontal:5, backgroundColor: delivery === "1" ? COLORS.secondary : COLORS.black}}><Text style={{color:COLORS.white, textAlign:"center", padding:SIZES.padding, ...FONTS.h5}}>Mobile</Text></TouchableOpacity> 
                </View>
            </View>  
            <TouchableOpacity style={{backgroundColor:COLORS.black, marginTop:40, borderRadius:10, paddingHorizontal:30, paddingVertical:20}} onPress={()=>UploadImageAndPost()}>
                    <Text style={{color:COLORS.white, textAlign:"right", ...FONTS.h4}}>Add Product</Text>
                </TouchableOpacity>         
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
export default AddProduct
