import React, { Component, useState  } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput ,
  SafeAreaView
} from 'react-native';

export default function Alternatives() {

  const [produit, setProduit] = useState([
            {id:1, image: "https://www.boutiquebio.fr/images/osthumb-239x500-CEBIO-200ml-SHAMPOOfortI.jpg", name:"GRAVIER",    comment:"SHAMPOOING FORTIFIANT quinquina - sauge - citron 200 ml CE'BIO ",price: '1680 DA Fixe'},
            {id:2, image: "https://dz.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/12/4641/1.jpg?5324", name:"Calliderm ",     comment:"Calliderm Masque Capillaire À L'Ail - 400Ml",price: '1250 DA '},
            {id:3, image: "https://dz.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/96/4171/1.jpg?3085", name:"Forever Living Gamme Anti Chute ", comment:"Forever Living Gamme Anti Chute  ",price: '1680 DA Fixe'},
            {id:4, image: "https://cdn.idealforme.dz/680-large_default/dilo-shampoing-a-l-ortie-pour-cheveux-gras-250-ml.jpg", name:"DILO",  comment:"Shampoing À L'ortie Pour Cheveux Gras 250 Ml",price: '1400 DA Négociable'},
             {id:5, image: "https://cdn.idealforme.dz/680-large_default/dilo-shampoing-a-l-ortie-pour-cheveux-gras-250-ml.jpg", name:"DILO",  comment:"Shampoing À L'ortie Pour Cheveux Gras 250 Ml",price: '1400 DA Négociable'},
              {id:6, image: "https://cdn.idealforme.dz/680-large_default/dilo-shampoing-a-l-ortie-pour-cheveux-gras-250-ml.jpg", name:"DILO",  comment:"Shampoing À L'ortie Pour Cheveux Gras 250 Ml",price: '1400 DA Négociable'},
               {id:7, image: "https://cdn.idealforme.dz/680-large_default/dilo-shampoing-a-l-ortie-pour-cheveux-gras-250-ml.jpg", name:"DILO",  comment:"Shampoing À L'ortie Pour Cheveux Gras 250 Ml",price: '1400 DA Négociable'},
              ]);




    return (
        <SafeAreaView>
           <FlatList


      keyExtractor= {(item) =>item.id}
      data={produit}
      ItemSeparatorComponent={() => {
        return (
          <View style={styles.separator}/>
        )
      }}

      renderItem={({item}) => (
           <TouchableOpacity >
          <View style={styles.container1}>

              <Image style={styles.image} source={{uri: item.image}}/>

            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <Text  style={styles.name}>{item.name}</Text>

              </View>
              <Text style={styles.comment}>{item.comment}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>

          </View>
           </TouchableOpacity>

       ) }/>

        </SafeAreaView>
        );

    }

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:150,
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
      },
      container1:{
        paddingLeft: 5,
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
      image:{
        width:100,
        height:108,
        borderRadius:20,
        marginLeft:20
      },
      content: {
        marginLeft: 16,
      flex: 1,
      },
      contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
      },
      name:{
        width:235,
        fontSize:16,
        fontWeight:"bold",
        color:"#9cb0c3",
      },
      comment:{
        width:235,
      },
      price:{
         fontSize:16,
        fontWeight:"bold",
        color:"green",
      },
}); 
