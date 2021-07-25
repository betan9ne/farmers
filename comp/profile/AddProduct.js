import React,{useState, useEffect} from 'react'
import {Text, View,  TouchableOpacity, TextInput, FlatList} from 'react-native'
import firebase from '../../firebase'
import { SIZES, FONTS, COLORS } from "../../constants"
import {useNavigation} from '@react-navigation/native'
import {Feather} from "@expo/vector-icons"

function AddProduct() {
    const[price, setPrice]= useState(null)
    const[items, setItems]= useState(null)
    const[delivery, setDelivery]= useState(null)
    const[doc, setDocs] = useState(null)
    const[subItems, setSubItems] = useState(null)
    const[subItem, setSubItem] = useState(null)
    const[ItemName, setItemname] = useState(null)

    const navigation = useNavigation()

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

    function addProduct(){
        let asd = {
            produce_category : ItemName,
            produce: subItem,
            createdAt: new Date(Date.now()).toString(),
            price: price,
            items: items,
            delivery: delivery,
            u_id:"lLXFN6xZAiwol0JEeIJ2",
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
        <TouchableOpacity onPress={()=>displayItems(item)} style={{paddingVertical:10,marginHorizontal:5, borderRadius:10, backgroundColor:COLORS.black}}>
            <Text style={{paddingHorizontal:20, color:COLORS.white}}>{item.name}</Text>
        </TouchableOpacity>
    )
    const renderSubItem = ({ item }) => (           
        <TouchableOpacity onPress={()=>setSubItem(item)} style={{paddingVertical:10,marginHorizontal:5, borderRadius:10, backgroundColor:COLORS.lightGray}}>
            <Text style={{paddingHorizontal:20, color:COLORS.black}}>{item}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={{padding:SIZES.padding*2, height:"100%", backgroundColor:COLORS.white}}>
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
                <Text style={{...FONTS.h5, marginVertical:10}}>Add Gallery</Text>
                <TouchableOpacity style={{borderRadius:20, marginHorizontal:5, backgroundColor:COLORS.dark}}><Text style={{color:COLORS.white, textAlign:"center", padding:SIZES.padding, ...FONTS.h5}}>Add Images</Text></TouchableOpacity> 
                <Text style={{...FONTS.h5, marginTop:10}}>Price</Text>
                <TextInput placeholder="How much does it cost" onChangeText={(value)=>setPrice(value)} style={{padding: SIZES.padding*2,}} />
                <Text style={{...FONTS.h5, marginTop:10}}>Items Available</Text>
                <TextInput placeholder="What do you have available" onChangeText={(value)=>setItems(value)} style={{padding: SIZES.padding*2,}} />
                <Text style={{...FONTS.h5, marginTop:10}}>Do you offer delivery?</Text>
                <View style={{flexDirection:"row", marginTop:10}}>
                    <TouchableOpacity onPress={()=>setDelivery("0")} style={{flex:1, borderRadius:10, marginHorizontal:5, backgroundColor: delivery === "0" ? COLORS.secondary : COLORS.black}}><Text style={{color:COLORS.white, textAlign:"center", padding:SIZES.padding, ...FONTS.h5}}>Stationary</Text></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>setDelivery("1")} style={{flex:1, borderRadius:10, marginHorizontal:5, backgroundColor: delivery === "1" ? COLORS.secondary : COLORS.black}}><Text style={{color:COLORS.white, textAlign:"center", padding:SIZES.padding, ...FONTS.h5}}>Mobile</Text></TouchableOpacity> 
                </View>
            </View>
            <View style={{position:"absolute", bottom:20, left:20, right:20}}>
                <TouchableOpacity style={{backgroundColor:COLORS.black, borderRadius:10, paddingHorizontal:30, paddingVertical:20}} onPress={()=>addProduct()}>
                    <Text style={{color:COLORS.white, textAlign:"right", ...FONTS.h4}}>Add Product<Feather name="arrow-right" style={{marginLeft:30}} size={24} color="white" /></Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddProduct
