import React,{useState, useEffect} from 'react'
import {Text, View,  TouchableOpacity,  StyleSheet, ScrollView,  FlatList} from 'react-native'
import firebase from '../../firebase'
import { SIZES, FONTS, COLORS } from "../../constants"
import {useNavigation} from '@react-navigation/native'
import useGetFarmers from '../crud/useGetFamers'

function Vendors() {
    let farmers = useGetFarmers().docs
    const [type, setusertype] = useState();
    const[filteredResults, setFiltered]= useState(farmers)
    let navigation = useNavigation()
    let userType = ["Buyer", "Seller", "Shop", "Transporter"]

    let filtered = []
    function filterByType(type){
        farmers &&  farmers.filter((val)=>{
            if(filteredResults == null || filteredResults == undefined)
            {
                setFiltered(farmers)
            }
            else if(farmers && 
                (val.type+"").toLowerCase().includes(type.toLowerCase()))
                {
                filtered.push(val)
                return  val
            }        
        })
        setFiltered(filtered) 
    }
    useEffect(() => {
        farmers && setFiltered(farmers)
    }, [])
console.log(filteredResults)
    const renderFarmers = ({ item }) => (           
        <TouchableOpacity onPress={()=>navigation.navigate("userProfile", {item})} style={{paddingVertical:15,  
         marginVertical:5, marginHorizontal:5,paddingHorizontal:0,  borderColor:COLORS.secondary, borderRadius:10, backgroundColor:COLORS.white, }}>
        <View>
            <Text style={{paddingHorizontal:20, color:COLORS.black, ...FONTS.h4}}>{item.name}</Text>
            <Text style={{ paddingHorizontal:20, borderRadius:10, color:COLORS.secondary, ...FONTS.h5}}>{item.type}</Text>
        </View>
        <View style={{borderColor:COLORS.lightGray, marginTop:10, borderWidth:1}}></View>
    </TouchableOpacity>
    )

    const renderType = ({ item }) => (             
        <TouchableOpacity onPress={()=>filterByType(item)} style={{paddingVertical:10,marginHorizontal:5, borderRadius:10,
         backgroundColor: COLORS.black}}>
          <Text style={{paddingHorizontal:20, color:COLORS.white, ...FONTS.h5}}>{item}</Text></TouchableOpacity>
        )

    return (
        <ScrollView style={{backgroundColor:COLORS.white}}>
            <View style={{padding:SIZES.padding*2}}><Text style={{...FONTS.h5, marginBottom:10,}}>Filter by Type</Text>
            <FlatList
            data={userType}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item}`}
                renderItem={renderType}
                contentContainerStyle={{                    
                }}
            />  
            </View>
                  {filteredResults &&  <FlatList
            data={filteredResults}
            vertical
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item.id}`}
                renderItem={renderFarmers}
                contentContainerStyle={{                    
                }}
            />  }
        </ScrollView>
    )
}

export default Vendors
