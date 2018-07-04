import React, {Component} from 'react';
import {connect} from 'dva';

import { Motion, spring } from 'react-motion';
import { Row, Col, Card, Button } from 'antd';
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

import borders from './../../assets/allcountries';

import BattlegroundCardBar from './BattlegroundCardSideBar';
import CardLoader from "../../components/CardLoader/CardLoader";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

@connect((namespaces) => {

  return {
    currentUser: namespaces.user.currentUser,
    cardpositions : namespaces.cardpositions,
    cards_left: [1,2,3],
    cards_right: [4,5,6]
  };
})
export default class extends Component {

  constructor(props) {
    super();
    this.state = {actors : []};
  }


  componentDidMount() {

    const {dispatch} = this.props;

    const problemset = window.parseInt(this.props.match.params.id);

    this.props.dispatch({
      type: 'cardpositions/fetchcardpositions',
      payload : {userId : 1, problemset : problemset}
    });

  }

  testChoro2() {

    var COLORS = ['#8c510a', '#d8b365', '#f6e8c3', '#c7eae5', '#5ab4ac', '#01665e'],
      BREAKS = [-1000, -500, 0, 500, 1000, 1500],
      FILTERUSE;

    const map = this.map;

    map.flyTo({center: [ 44.361488, 33.312805 ], zoom: 22});

    this.setState({actors : [1]})
  }

  testChoro() {

    var COLORS = ['#8c510a', '#d8b365', '#f6e8c3', '#c7eae5', '#5ab4ac', '#01665e'],
      BREAKS = [-1000, -500, 0, 500, 1000, 1500],
      FILTERUSE;

    const map = this.map;

    map.flyTo({center: [ 44.361488, 33.312805 ], zoom: 3});

    map.addLayer({
      "id": "tracts",
      "type": "fill",
      "source": "borders",
      "paint": {
        "fill-color": {
          property: 'choropleth',
          stops: [
            [BREAKS[0], COLORS[0]],
            [BREAKS[1], COLORS[1]],
            [BREAKS[2], COLORS[2]],
            [BREAKS[3], COLORS[3]],
            [BREAKS[4], COLORS[4]],
            [BREAKS[5], COLORS[5]]]
        },
        "fill-opacity": 0.5,
        "fill-outline-color": "#ffffff"
      }
    }, 'country-label-lg');



  }

  render() {

    const { actors } = this.state;

    const cardpositions  = this.props.cardpositions.cardpositions.list || [];

    const extra = <Button onClick={this.testChoro.bind(this)}>Something</Button>;

    const that = this;
    return (
      <div>

        <Map
          style="mapbox://styles/mapbox/dark-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw",
            position: 'absolute',
          }}
          center={[ 44.361488, 33.312805 ]}
          onStyleLoad={(map) => {

            that.map = map;

            map.addSource('borders', {
              type: 'geojson',
              data: borders,
            });

            // map.addLayer({
            //   id: 'bordersfill',
            //   type: 'line',
            //   source: 'borders',
            //   paint: {
            //     'line-color': '#088',
            //     'line-width' : 5,
            //     'line-opacity': 0.3,
            //   },
            // });

          }}
        >

        </Map>

        <div style={{'position': 'absolute', 'width': '20%'}}>
          <BattlegroundCardBar right={false}>

            {
              cardpositions.map((item, i) =>
                (<li key={i} style={{'marginBottom' : '10px'}}>
                  <CardLoader clickevents={{testChoro : this.testChoro.bind(this), testChoro2 : this.testChoro2.bind(this)}} extra={extra} card={item.card}/>
                </li>))
            }

          </BattlegroundCardBar>

        </div>

        <div style={{'position': 'absolute', 'width': '20%', 'right' : '0px'}}>
          <BattlegroundCardBar right={true}>
            {
              this.state.actors.map((item, i) =>
                (<li key={i}>
                 <Card title={'A bad person'}>
                   <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFRUWFxcYGBcVFxcYFxgYFxgXFhcXFxgaHSggGBolHhcXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFy0dHRktLS0tKysrLS0rLSstLS0tLSstLS0tNzcrLS0tLTc3LTcrLS0rNzItMi0tNystKy03Lf/AABEIARAAuQMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAACAQMEBQYABwj/xAA+EAABAwIDBQUHAgQFBQEAAAABAAIRAyEEMUEFElFhcQaBkaHwEyIyscHR4QfxFCNCUjNDYnKSNFNUosIW/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAgEQEBAAICAgMBAQAAAAAAAAAAAQIRAzESIRNBUTIU/9oADAMBAAIRAxEAPwD0RLC4JVR0JQlhdCBISwlhLCBIXBqIBERCAN1KGqu2ttqnRHxAu4TpxWb2l20pMiJqGbkGGjkBGaDart1eUu7f1faEhjd2cnXJGfdZS6v6iOlsUbDNu9cmZF9BFkHpULt1ecYb9SoJ9pRHLcdI5zvarR7F7YUcRaSxw0dAB6EoNGWpIQUaocJad4cjKeAQNwkhGWpEAFIQiSFAKQhEkQDCREkQOgJYXBEEHQlhcEUIBSlKI1yCyPbvtWMNT3KLm+2eLHRjdXRqeH4QW23O02Hwo/mPAdHwC7z0A05lYbav6iPe6KTGtaB/X7zieMTujwKw2L2iXSd7eJ+KbyVAOI5ILnaO1nvdvueS4mZPfboq/wDjc+aiEkx80bqAymDzmEBnE+uqQ1jJzHFJ7LdvnY9fBNPpmbXn6oHW4glOuxWQAmL3vPVRsPSk7sxxPJHiKW7pAKCywG38RSM06xZrYkDwW/7K/qK57208WGw6AKzBuwdN9uRH+oLyaSnaeIOqD6ci0iCOSEtXj/Y/t07DgUqwL6ehk7zfuORXrGAx1OswVKbg5p1Bnx4FA4UhCchCQgApERCRABC6UqFBICUJAuagVKSuIUPHYndzyFzp0HfIQVHa7bww1IvNzkxo/rd9ABcn7rw7a20n16hqVCSSb38hyV/272s6tXPvQ1nutbwj4j3n5LJh/wC6A6TfUqVTZnllN/V12EpE3/c9FcYLs/UqwSbcFm5SdtY4XLpUYalOQk8irPDbJc53vNIBtJ481q9l9nGUzOqv2YRoER4rhlzfjvjwfrzevsJ4JgSB6CQbIeWk7pgD55L07+HHBB/DNuIzzU+at/548fxGEey8EJtrw43Xp+1djsfp4Z9Vj8f2Yc0ktNuea6Y8svbllw2dKKtQEW+cqLuD9la1sG9sB4sciFW12FrjZdZZXGyzsrHxqtz2C22adQMkjfyM2mMiOFvksIPH15KThpBEWKqPovCYreAkd4y/CkkLz/sbtwlga85anwW6w1YOGfrRAZQlOFAUAkIUZQwgfAXQlXIOaVXbVw5eHbp3QGEzIjKfz3KwL+YlY/t1jCzC1Xb4bvAtAE7zibdwzQeN4wy46801SoanLgNTwTgErRbG2c2ziJPHh0WM8vGN4Y+V0k7C2VYFwub9AtbQpaKLhWQrGgvFlluvdjjJ6h+hTSzdExvNCVGzjU29yMJqogR6i4imIUuNVHqlLRU4jCtcCHDNZfa2yw2Zy0+i2FcKJjKAcIN1vDOxzzwmUecYvCFhRUX8Sr/a+AhszIHHh11hZ2vTi/cvZhl5R4s8fGtTsTFwIB97NbHY23CLErznYNUb4BMSPE6dFpmmCCjD1HBY0PClkrI7AxgMBaumZErQWEiIpEDy4hcEbUDVanMxn0XnH6uO3KFMD+p8d0E/ML0p49eX2XmH6uUi6myoDZrwPFsT4hB5xSED5lbTYzP5YWNwsRJOq3OAZDB0XDm6kejgnu1aYdyn0lk37dDX7rRaYnj+FbUNqAm5APCVxvFXacsX7TxXOUajiQ4RITzQVzs06yyn2hMVgpLckxXaSjRtoTFUJ2Iz0Uetiwr42s+URqoUZxXYvHsA0UehiA64P4V8LIz5y3SPtenLCsbiqJa2+R+X7rcY4SCsRtGr/T3HlBsvRw3083PPcM4CoWvBHGVtZkA8QFjdltl4HP8Ada+nIaARkAF2rgtdg1t18L0PAvBavLcM6Hg816NsU+6FILUoIThQ7q0h0IghRIFdksT+oWzd/B1XH+kSOocHfKVuJH4WS/UN5GHLWkAuIBAuSNeig8Q2a2arG6E/KStljKjiBTYJJF40CzGw6M4lo4StvT92TF1x5L7ejim4pKGxqszuX4mL8go+Ow9WnE0zAMyLjwWi/iXuOe6OklSm4beE75/9flmszkrfw4/rNbH2i8HeBmPiadRl45WW92ZiA8CbcvWiyOLwO67eFnf3N+qttjbQJO674vnzWcspWsMLi1e4FFxlTdBIGkow8kKu2rid1pPBc5XW9MrtnaGKbJDwG8IGvrzVEzarwYc+Z4afdWuOPtSSYaOWfipGztmNF20xH9z/ALld5nJHnvHbe1VVxO+BcRfke8ZFN08S5hloka8O9al5LbFjCP8ASQmzTpOvugdQnyT8Phv6i08SHskcPNYvajYqFbelhQ0ndyOiyfaKlFTJXj7Z5evYNhge1bMd/Fax6zOx6J3haT8lpyutcAAwVvOzleWhYFy1vZiQBKRG1SJKZsulaDoRBCEQQFMSVl+2uH3qIkSC8T/xctPmqvtGJw7rXBb47278is5/zW+P+o8jwGzfZ4w82uI6TCudpseG+7mlxbN3GbvCiPN8WVjubwXmyu9V6sZJbIodh0KZfOKLnAf033J5gZ96j7T7P71Z/sNw03EEHdDSLg7rSRLTpbMLSM2aCZhTaGzYzJhPOtfHFUcGKbGCmKjnAAODy0tcdSBvSFHZh4cCAW3kA8Ff18M0WAUejhpdJ6Dos5VvGai9wQll+CzHagE2Wlwwsqnb2HkLDVnpmMNh2giRvHSbMHNxufBS9uOqUWUnsrNeHEh7aLQXNAg239Ym8AWUrZoI9wmOB4hWLsKSOPf9+q643TnljtlNh4WviGVKj6kboG6XtG6TckGIgxFxxTH8Y6kQ2oBJEjdcHNvzGR5FXmK2Yb/F00TGH2W0GSAUuUv0kws+y4M74mIWV7TM/ngcQPqtvuBotZYztVas08Wj/wCgtcV9ufNFz2e2eXMD8msHAS43JJ4NROV3spoZhBpv0ZHUW+RVG4rXHd7Y55JqQ2Qtt2bp+6JWJGa3PZupLQuscGoY2y5cw2XLSHAiCEIggJqqu0n/AE7zqC3x3gVahV236BdRcGiSGm08j4lTLprG6srzGriA7HOv/lAdLzHmr+gsDRxYbjC6bEuB8IW4wVUFebOdPVx5btXOGYny1M4ZylALjfT1SbRarIElQKdS9lY48w0nQBVuz6JjeOZ0UhVpSqwFX7TqyDwU8UjuzEqvxtMkEKl6RME0EkK2ZSI6Kh2K4io5p4SPkVpmiym9JrZl9GQoNWiArNygYt0CVrZZpW4xsBYbtK/eqEcGtHfc/Va7aWJABMrBVq5fULuLvwu3FPt5Oa+49GqYgfwdKD8NKD1dAA8lROKaGJ3aDGDJ7vIAk+cIiVvCOfNd1wN1v+zlA7oWAw4lzeoXqmxWe6F0jksALIU45NytIcCVIlQGExtCuGU3OOQBP/G5A4m0d6fiU1i8OXsczUhwB1BIInhqoPm/GVf5j3DiT4krXbA2nIG96ssntXCezqPac2uIPUeincDiSw5rOWO46YZar1XC1+cqyp1FhNh7Q3jEkiw6c/LzVttHbgpyAbxPrmvJljd6e3Dk9bXm0qkiFTuxtTfBZulozbJDu7SeqotodpTFs4J8MvEqnxO2cRUgh26BnGZI5q48dTLlxelt7RNDS3e3R/UDGnFZsbcqVKvuUnGkf8xxABHFozKq8N2iBY8VWNc5jZnO40KqMdtquTM+7oIy7u9b+Ni80bOjVnENLdGnejQGInv+S1DXSJC852ft+GiWhsiTAABgwtHs/bwd7ptORmx9QuWWFjrjySryvVhUu0cZY3T+0cZAnlPVY/a+0N9thBKuGNqcmekfbOP09dFSCJt69ApKry53P95ugpn3oJIEm50Xrxx1NPDllu7WOCrmo4E/CywHiTPMlXblUbEpe4D1PmB9FaEozs7hP8RvUL1PY3wheXbNbNRvVepbI+EKxFgSm0ZQytA0SRKEBtQY2uKdNz3WDRmjYq3tJQdUwlZjDuu9m4tOfvC7bDSe9B4v+oVVn8Y8tEb7WPNtS2MtNCss+oZ6j5qf2ixD6ldzqjSx0NbunNoaAAOQUalU3QXRra1u5FXuyMV7OkTqYtqc8/JJWr75k31PUZT0VVhMRYyJ9cVJwtW+WuWS5+M7b8vWkzDbNDzJMZHTW/UK4wmyaQIJkkf22FtLqXRwlINbLQDFyMiTx4qxweAa6I8QuOWW3t4uGa9q2rsDDvcXtrezaWtBY5skBoi3GfqmsZsnDW3N4AWlwkHuzWnfsJkiHb2sibWyKg4zZYbffLuEE2Td/W5w4spjNkw2QRGl8teuir2UqlIkzaT5XstK/AyfiIbqLSeSo8dUa3eaZgGQDfLu4LWF36eblw8LuLF+0XFjQTMTzzz8lmcbiRLgMtOdxZH7XODERnwUWrR3pMxmctRl0ldMcZHHPLZfaCBxvmlgZTMkk24ZdVHaw3m5jijGQngujmvtjkbk8vr+Cp5KrNjVLQFYlZE7Y7Jqheo7LENC8x2D/iL0vZjrBWCeUEoihhVDqVIEoQGAgxTvd804FSdsccaOEqVeAseoiOqDxTtjWZUxlVzJ3d6DaDIzi9xae9UzzaDFuf0S1K8kk/1XNtSVHa+dEVLpshpBznipGGs6eGWWfFRmzuk5mxngcinKDoMk6DuJGag1DHe6BJvz1OQ652HFV2I2pUpENY8zBJg2m9vBQvbwIm4veTzAtrn4qHXY91zmc8tcraLn8c263luvS0p9qK4M+1d45qae1FZ9vosvWpwXAXDbTpnmuZVIM/L8LVwxv0k5c59tO/apLbm5N9eaq8djBUvmREnpZQmYjPh48EtI3tN58FMcJEyzuXZHC8Zz+4TBrE2vf1CMukWGRRsAAuLge9eJC3pgRrHPhlAtwMdyB9WYHiic2LkiIGsnh3ph5vbVUXGxRmP2VsSs3QxJYZGSvMNixUaHDvGoWaLjYroc48Gk+C9O2YLDovJNl196qKQzcQD/ALc3L13ZzIaqJiCUZKblVD4ROQOdH5ssF2w7RNcC11Tdw4DgWs+Ou4ZsBzFMamwOVxKCbtTtayo91PDlzg0w6o0F0kZtogEAxkXuMCbBy807WYqo73ajnF0/C+q57+rmzutN9GhJtbtlULfZ4cCizK0TAsAM90RwKzYDRJL955uYBiczLjme5A5FtJ+kfhCxsn1mnnQWgjXTp+6LD0mkgEkDWM+cIGTWtHTyylScPVE3id0/UeKZr4eDGt5EZdTko0EFBPOIO8RkPUfNG8zJmJAm8Z9O5M0Q15ne3SI6Xtnpouc7iReO7MIHsMwQ6bzHr1wTAoTkhpuF5PTqMk77aw4AzfiJsooYEgxOpvziEgqC8Wy6cI800MQchln4IGuM31zjr5Kh5t/DTx/dITY58vqgB5DqNErvvE8EBF9py08kkxrcj18kNMce5c55y5QfGbIgmOAvMdLo6VbdkNMz3XUcG+inYChJkmeWvggvuyHuP9o67jN+Er1rZWL3gLrx2niwxwn/AHEcANSvSOx+1mVaYcLcRwUGtqPgJr2ir8RjwXBoTslUeabc/UOvXmnh6UjUjfeTyMAAN5DPiqGvg6ri44uo2i51/eEuj+1tKmPdGVjujJSsZ2vqQW4djMKwzal8cH/XFidSIN81n6tfeJJMk3JJJJPEnVNBvE0mCQ0udwcRuzz3bx4qII/dO1QTll5JGUT3fXIIJFNwAb45cRB9c0QqXJFjnyz4JWtzkHPQaDrzKIkDTScxmTqii9r7psN4wBI5dc0xXbcXk69R9ERqghtrjM+EHugpqoNfXVEDU92RPnbyzTElPtpAfFPdHI5LhRERmT5jVAjBlqMyBaYXOvac+GXHVEIBj1P0RteQL5Z3y4SPkgac2TYcPJcacnrfxTm8ZA/a6d9oMjoPHrzEIGvZwJGR9fNcxkzA8Ohk36FOudMxEWz66a6oLAAcbnjP1/KK7di0Sc+QtJTRZdPl1s7iRc2BImRwHLkhpNMHWWjuuPp80Q0XQZgd3il9vB92x4goHnxTLs0EkVnOkT8V3O1IGnRabYW2WMaGNduf7te/JZeieKeCukez9naO9D5DuYMjyWk3QvnvC4qpTM03vYeLHOb8irL/APU43/y63/Ip4m1I5qVjUbmoqTVpAuakI4D91Jc2Eu7cGLjwUsXYCw3HHhrr3qJXZFpnyU7QE3i2cRwTFXedYwAB0/JWVR6TCcs4y1zgfdIwmTwNuScoUZ5SNZvqO4rqrCIB009dECMud0C5Ii+X3TbHmbZqQynJGhA881HDfO3f4oOqVJsjBLgGzkDf6eKEltxwJ8JH28kVIQd0+WZ0QC68QJtJztHFFVqCRGQHC90gbeJ437sklQQOv4kIrmu+/wBoTjIM9bfTusmRwPTPh9ETn6XnI8IH4RDjBHEZz8rJGnK0W8tDHrJKXFsgQZAnoYP280jXCMrka6CRf5+KBh5MydU6zDalc0SchaBbl9VJhakTYAxdCdDVwCuk2ZKGE4WpN0JoOvauwzZR1QhwhsqHnNQvBA0v58k65Rq31UoN1UkzlzEADn4fNRbE52/uvfpxRVrDP83HruQlwGcHj88lhoVF1p158CDedMrJaVOxceWhvlPdn4JvfsTnMW8IyXMdOoAz5TFkDmJId70zNy2LAXsoz22yAiQNeHyRhzjnlMSdTBzS0yIEnW470DRsDAzJF+Aj8Jth69ylUh8U5gEjrpfoootF737uqBSb/TmjrySCdb8r3SMbObv3CQk53siu3j6jVc9pBuIP3Qj16CdZnJANxMZFEc0WOco3kRebadb/ACKOmRoNfL1CHECQDMnXKLDdHyQJSCkevumaQ1CeAW4yJhzRBqBhv3JxUAWofZp1du80C1hZN4Q2T1QKPhtep+aCZOUeio9ZqehNvBlAw+nqOnU5whqAXmJE52nSw1P2ToF4J6deKYqZ3vyJj0Fiq6kW7wtYce/NBEnvzP1SUwNTxtHyXAGeGvjxRSP0vNvAXt9U27QzmnSBxvGSbIPggJzrHu7o/dIwcr3+wKWk3prn0RHM9COX7IEqgbwtm0WGlp+d0FQ8D65ouGVh9fygF7efVQdRpyb+h+FIosh2hA7wR3pqi4iYz7o80To6HkqHbDj9uqbgRxy08bohlcWPAmbZpCLd+aBaQIKeKaperp2o46+oWojhmnXJlmaecqhQlgIWFLu80DT8bTj4wo1HGUwT7wzt4K37JbZw9HD1WVDuVC8uLvZCr7Sn7PdFESPdO970mBfPNO7H7QYNmGfT3fZnfeXUdwVPbtc8OYwVSJZus9wkkR8Qk2UtFYMdTy3wg/jqZPxDz1Vns7tHQbgqODe2Q4vbXefhptfWa72jWbkvqBgMEOtlBUTtrtPC4mvSrYZrmEjdqMc0CNx+7SI3fdP8vdbb/t3ubtgGBDVpgkkib+PGI9XStzRkpoVz3kG2SeaQeSdqUdUVNllNLs09tvXO6T2af9ndEB4q6Q2xpEXNo8kFVh5eSkhoXBoTQrhPoIjT4nyU1zAeCac0JpdozmxpqnmtB09aJ0NSezumjZprErGm40OY0KdAXQmkNMZCN+R6J0BNVjZUc1OuKbBRlBzEW6gY5HPNB//Z"/>
                 </Card>
                </li>))
            }
          </BattlegroundCardBar>

        </div>

      </div>
    );
  }
}
