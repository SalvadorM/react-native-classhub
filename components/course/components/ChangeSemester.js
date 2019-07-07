import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity, Picker } from 'react-native'

const Season = (props) => {
    return(
        <Picker
        selectedValue={props.season}
        style={styles.pickerStyle}
        onValueChange={(itemValue, itemIndex) =>
            props.change('season', itemValue)
        }>
        <Picker.Item label="spring" value="spring" />
        <Picker.Item label="fall" value="fall" />
        <Picker.Item label="summer" value="summer" />
        <Picker.Item label="winter" value="winter" />
        </Picker>
    )
}

const Year = (props) => {
    return (
        <Picker
        selectedValue={props.year}
        style={styles.pickerStyle}
        onValueChange={(itemValue, itemIndex) =>
            props.change('year', itemValue)
        }>
        <Picker.Item label="2016" value="2016" />
        <Picker.Item label="2017" value="2017" />
        <Picker.Item label="2018" value="2018" />
        <Picker.Item label="2019" value="2019" />
        <Picker.Item label="2020" value="2020" />
        </Picker>
    )
}

export default class ChangeSemester extends Component{
    constructor(props){
        super(props)

        this.state = {
            season: '',
            year: '',
            cbResponce: false, 
            error: false,
            switchRender: true,
        }
    }

    async componentDidMount() {
        try {
            const season = await AsyncStorage.getItem('season')
            const year = await AsyncStorage.getItem('year')
            this.setState({season, year})
        } catch(e){
            console.log(e)
            this.setState({error: true})
        }
    }

    _changeSemester = async (key, val) => {
        try {
            const { season, year } = this.state
            await AsyncStorage.setItem(key, val)
            if(key === 'season') {
                this.props.setInfo(val, year)
            } else {
                this.props.setInfo(season, val)
            }
            this.setState({[key]: val})

        } catch(e) {
            console.log(e)
            this.setState({error: true})
        }
    }
    
    _close = () => {
        this.props.close()
    }

     _setPicker = ( bool ) => {
        this.setState({switchRender: bool })
    }


    render(){

        const { season, year, switchRender } = this.state

        return( 
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <TouchableOpacity 
                            style={styles.touchBtn}
                            onPress={() => this._setPicker(true)}
                        >
                            <Text style={styles.touchText}>Season</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoBox}>
                        <TouchableOpacity 
                            style={styles.touchBtn}
                            onPress={() => this._setPicker(false)}
                        >
                                <Text style={styles.touchText}>Year</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.pickerContainer} >
                {(switchRender) ? 
                    (< Season season={season} change={(key, val) => this._changeSemester(key, val)}/>) : 
                    (< Year year={year} change={(key, val) => this._changeSemester(key, val)}/>)}
                </View>

                <TouchableOpacity style={styles.button} onPress={this._close}>
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity> 


            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerContainer: {
        height: 300,
        paddingTop: 60,
    },
    pickerStyle: {
        width: 500,
    },  
    button: {
        width:200,
        color:'#2D3142',
        backgroundColor: '#EF8354',
        borderRadius: 25,
        marginTop: 25,
        paddingVertical: 13
      },
      buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'white',
        textAlign:'center'
      },
      infoContainer: {
        paddingTop: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
        },  
        infoBox: {
            width: '50%',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        touchBtn: {
            width: '85%',
            height: 50,
            backgroundColor: '#295477',
            borderRadius: 4,
            justifyContent:'center',
            alignItems: 'center',
        },
        touchText: {
            color: 'white',
            fontSize: 24,
        },
})