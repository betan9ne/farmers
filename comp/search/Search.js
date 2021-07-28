import React,{useState, useRef, useEffect} from 'react'
import {Text, View, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, FlatList} from 'react-native'
import firebase from '../../firebase'
import { SIZES, FONTS, COLORS } from "../../constants"
import {Feather} from "@expo/vector-icons"
import {useNavigation} from '@react-navigation/native'
import useGetCategories from '../crud/useGetCategories'
import SearchItem from './SearchItem'
import useSearch from '../crud/useSearch'
import useGetAllProducts from '../crud/useGetAllProducts'

function Search() {

    let categories = useGetCategories().docs
    
    const searchBOx = useRef()
    const searchButton = useRef()
    const navigation = useNavigation()
    let searchdata = useGetAllProducts().docs
    const[search, setSearch] = useState(null)
    const[status, setStatus] = useState(false)
    const[tag, setTag] = useState(0)
    let searchResults =  useSearch(search, tag).docs
     
    function takeFocus(){
        searchBOx.current.focus()
        setStatus(true)
        console.log(status)
    }
    
    let filtered = []
     //from text search input
    function searchStuff(value){
        setSearch(searchBOx.current.value)
        setTag(value) 
        filtered = searchdata.filter(value=>{
            console.log(value.produce)
            return value.produce.match(new RegExp(search, 'g')) ||
            value.produce_category.match(new RegExp(search, 'g'))
        })
        console.log(filtered)
    }

    //from the tag cloud
    function searchTags(value){
        searchBOx.current.clear()
        setTag(0)      
        setSearch(value)        
    }

    //get search term in texrt input
    function getSearchTerm (value) 
    {
        setSearch(value)
    }
 
    const renderItem = ({ item }) => (           
        <TouchableOpacity onPress={()=>searchTags(item.name)} style={{paddingVertical:10,marginHorizontal:5, borderColor:COLORS.lightGray, borderRadius:10, backgroundColor:COLORS.white, borderWidth:0.4}}>
            <Text style={{paddingHorizontal:20, color:COLORS.dark, ...FONTS.h5}}>{item.name}</Text>
        </TouchableOpacity>
    )

    const renderSearchItem = ({ item }) => (           
        <TouchableOpacity  onPress={()=>navigation.navigate("viewProduce",{item})} style={{paddingVertical:10,marginHorizontal:5, marginVertical:5, borderColor:COLORS.lightGray, borderRadius:10, backgroundColor:COLORS.white, borderWidth:0.4}}>
           <SearchItem data={item} />
        </TouchableOpacity>
    )

    return (
        
        <View style={{padding:SIZES.padding,backgroundColor:COLORS.white,}}>
             <View style={{padding:SIZES.padding*2,}}>
        <Text style={{...FONTS.h2}}>Search</Text>
        <View style={{flexDirection:"row", width:"100%"}}>
            <TextInput returnKeyType="search" ref={searchBOx}  placeholder="search for something" onChangeText={(value)=>getSearchTerm(value)} style={{padding: SIZES.padding, borderRadius:10, borderColor:COLORS.lightGray, borderWidth:0.4, marginRight:10, flex:1}} />
            <TouchableOpacity onPress={()=>searchStuff(1)} style={{backgroundColor:COLORS.black, alignSelf:"flex-end", padding:SIZES.padding, borderRadius:10}}>
                <Feather name="search" size={24} color="white" />
            </TouchableOpacity>
        </View>
        <Text style={{marginTop:10, ...FONTS.h5}}></Text>
        {categories &&  <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{                    
                }}
            />  }
    </View>
    <ScrollView style={{backgroundColor:COLORS.white, height:SIZES.height-120, marginBottom:0, paddingBottom:90}}>
            {
                searchResults.length !== 0 ? 
                <View>
                    <View style={{flexDirection:'row', paddingHorizontal:20}}>
                    <Text style={{flex:1, ...FONTS.h5}}>{searchResults.length} {search} results</Text>
                    <TouchableOpacity style={{flex:1, }} onPress={()=>setSearch(null)}
                    ><Text style={{textAlign:"right", padding: 5, borderColor:COLORS.lightGray, borderRadius:5, borderWidth:0.2}}>Clear Search</Text></TouchableOpacity>
                    </View>
                    
                <FlatList
                    data={searchResults}
                    vertical
                    showsHorizontalScrollIndicator={false}               
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderSearchItem}
                        contentContainerStyle={{                    
                        }}
                    />
                    </View>  
            :
            <View style={{justifyContent:"center", padding:SIZES.padding*4, alignItems:"center"}}>
                <Text style={{...FONTS.h3, marginVertical:20, fontWeight:"900"}}>What are you searching for?</Text>
                <Text style={{...FONTS.h5, textAlign:"center"}}>Search for produce or services of interests in your area.</Text>
                <TouchableOpacity pointerEvents={status ? "none" : "auto"}  ref={searchButton} onPress={()=>takeFocus()} style={{backgroundColor:COLORS.black, marginVertical:40, borderRadius:40}}>
                    <Text style={{color:COLORS.white, padding:SIZES.padding*2, ...FONTS.h4, paddingHorizontal:40, fontWeight:"900"}}><Feather name="search" size={20} style={{marginHorizontal:10}} color="white" /> Start Searching</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("addProduct",)} style={{backgroundColor:COLORS.black, borderRadius:60, padding:10}}>
                    <Feather name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
            }
            </ScrollView>
        </View>
       
    )
}

export default Search
