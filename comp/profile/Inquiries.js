import React,{useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SIZES, FONTS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import firebase from "../..//firebase";
import useGetInquiries from "../crud/useGetInquiries";
import {TabView, TabBar, SceneMap} from 'react-native-tab-view'
import { ScrollView } from "react-native-gesture-handler";
import useGetMyRequests from "../crud/useGetMyRequests";

function Inquiries() {
  const navigation = useNavigation();
  let inquiries = useGetInquiries().docs;
  let myRequests = useGetMyRequests().docs
  const[pending, setPending] = useState()
  const[accepted, setAccepted] = useState()
  const[rejected, setRejected] = useState()
  const[requested, setRequested] = useState()

  function updateStatus(id, status){
    firebase.firestore().collection("inquires").doc(id).update({status:status}).then(()=>{
      console.log("status updated")
    }).catch((e)=>{
      console.log("Error", e)
    })
  } 

  useEffect(() => {
    inquiries && getPendingItems("pending")
    inquiries && getAccptedItems("accepted")
    inquiries && getRejectedItems("rejected")     
  }, [inquiries])

  let _pending = []
  let _accepted = []
  let _rejected = []
  const getPendingItems = (value) =>{
    console.log(value, inquiries)
     inquiries.length === 0 ? console.log(inquiries) : inquiries.filter((val)=>{
        if((val.status+"").toLowerCase().includes(value.toLowerCase())){
          console.log(val)
            _pending.push(val)
            return  val
        }        
    })
    setPending(_pending)   
 
}

const getAccptedItems = (value) =>{
  console.log(value, inquiries)
   inquiries.length === 0 ? console.log(inquiries) : inquiries.filter((val)=>{
      if((val.status+"").toLowerCase().includes(value.toLowerCase())){
        console.log(val)
          _accepted.push(val)
          return  val
      }        
  })
  setAccepted(_accepted)   
  
}

const getRejectedItems = (value) =>{
  console.log(value, inquiries)
   inquiries.length === 0 ? console.log(inquiries) : inquiries.filter((val)=>{
      if((val.status+"").toLowerCase().includes(value.toLowerCase())){
        console.log(val)
          _rejected.push(val)
          return  val
      }        
  })
  setRejected(_rejected)   
  
}
//console.log(_pending, inquiries)

  const layout = useWindowDimensions()
  const[index, setINdex] = useState(0)
  const[routes]  =useState([
    {key:'first', title:"Recieved"},
    {key:'second', title:"Accepted"},
    {key:'third', title:"Rejected"},
    {key:'fourth', title:"Sent"}
  ])

  const renderInquiries = ({ item }) => (
    <View
       style={{
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: COLORS.white,
      }}
    ><Text
        style={{ paddingHorizontal: 10, ...FONTS.h4, color: COLORS.secondary }}
      >{item.produce}
      </Text>
      <View style={{flexDirection:"row"}}>
          <Text style={{flex:1, paddingHorizontal: 10, ...FONTS.h5, color: COLORS.darkgray }}
          >Quantity: {item.quant}</Text>
          <Text style={{flex:1, paddingHorizontal: 10, textAlign:"right", ...FONTS.h5, color: COLORS.black, fontWeight:"900" }}
          >Price:{item.price}</Text>
      </View>      
      <Text
        style={{ paddingHorizontal: 10, ...FONTS.h5, color: COLORS.dark }}
      >Request sent on {item.createdAt.slice(0, 16)}
      </Text>
     
      {item.status === "pending" ? 
      <View style={{flexDirection:"row"}}>
      <TouchableOpacity style={styles.button1} onPress={()=>updateStatus(item.id, "accepted")}>
        <Text style={styles.buttonText1}>Accept </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2}  onPress={()=>updateStatus(item.id, "rejected")}>
        <Text style={styles.buttonText2}>Deny</Text>
      </TouchableOpacity>
      </View>
      : null}
      <View style={{borderWidth:1, marginTop:10, borderColor:COLORS.lightGray}}></View>
    </View>
  );


  const renderMyInquiries = ({ item }) => (
    <View
       style={{
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: COLORS.white,
      }}
    ><Text
        style={{ paddingHorizontal: 10, ...FONTS.h4, color: COLORS.secondary }}
      >{item.produce}
      </Text>
      <View style={{flexDirection:"row"}}>
          <Text style={{flex:1, paddingHorizontal: 10, ...FONTS.h5, color: COLORS.darkgray }}
          >Quantity: {item.quant}</Text>
          <Text style={{flex:1, paddingHorizontal: 10, textAlign:"right", ...FONTS.h5, color: COLORS.black, fontWeight:"900" }}
          >Price:{item.price}</Text>
      </View>      
      <Text
        style={{ paddingHorizontal: 10, ...FONTS.h5, color: COLORS.dark }}
      >Request sent on {item.createdAt.slice(0, 16)}
      </Text>   
      <View style={{borderWidth:1, marginTop:10, borderColor:COLORS.lightGray}}></View>
    </View>
  );

  const Pending =() =>{
    return(<ScrollView style={{flex:1, backgroundColor:COLORS.white}}>
          <View style={{ padding: SIZES.padding * 2, height: SIZES.height }}>
      <Text style={{ ...FONTS.h5, marginVertical: 10 }}>
        You can accept or deny your incoming requests from here
      </Text>
      {pending && (
        <FlatList
          data={pending}
          vertical
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderInquiries}
          contentContainerStyle={{}}
        />
      )}
    </View>
    </ScrollView>)
   }
   
   const Rejected =() =>{
    return(<ScrollView style={{flex:1, backgroundColor:COLORS.white}}>
          <View style={{ padding: SIZES.padding * 2, height: SIZES.height }}>      
      {rejected && (
        <FlatList
          data={rejected}
          vertical
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderInquiries}
          contentContainerStyle={{}}
        />
      )}
    </View>
    </ScrollView>)
   }

   const Accepted =() =>{
     return (<ScrollView style={{flex:1, backgroundColor:COLORS.white}}>
        <View style={{ padding: SIZES.padding * 2, height: SIZES.height }}>     
      {accepted && (
        <FlatList
          data={accepted}
          vertical
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderInquiries}
          contentContainerStyle={{}}
        />
      )}
    </View>
     </ScrollView>)
   }

   const Requested =() =>{
    return (<ScrollView style={{flex:1, backgroundColor:COLORS.white}}>
       <View style={{ padding: SIZES.padding * 2, height: SIZES.height }}>     
     {myRequests && (
       <FlatList
         data={myRequests}
         vertical
         showsVerticalScrollIndicator={false}
         keyExtractor={(item) => `${item.id}`}
         renderItem={renderMyInquiries}
         contentContainerStyle={{}}
       />
     )}
   </View>
    </ScrollView>)
  }

   const renderScene = SceneMap({
    first:Pending,
    second:Accepted,
    third:Rejected,
    fourth:Requested
  })
  return (
    <TabView
    renderTabBar={props=> <TabBar{...props}
    renderLabel={({ route, focused, color }) => (
      <Text style={{ color:COLORS.black, margin: 8 }}>
        {route.title}
      </Text>
    )}
    style={{backgroundColor:COLORS.white}}
    indicatorStyle={{backgroundColor:COLORS.secondary}}
     />}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setINdex}
      initialLayout={{width:layout.width}}
     
    />

  );
}

const styles = StyleSheet.create({
  button1: {
    marginHorizontal:10,
    marginTop: 10,
    flex:1,
    ...FONTS.h4,
    textAlign: "center",
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
    padding: SIZES.padding,
  },
  buttonText1: {
    color: COLORS.white,
    textAlign: "center",
  },
  button2: {
    marginHorizontal:10,
    marginTop: 10,
    flex:1,
    ...FONTS.h4,
    textAlign: "center",
    borderRadius: 5,
   
    backgroundColor: COLORS.primary,
    padding: SIZES.padding,
  },
  buttonText2: {
    color: COLORS.white,
    textAlign: "center",
  },
});

export default Inquiries;
