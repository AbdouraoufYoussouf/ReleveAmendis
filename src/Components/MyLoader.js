import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import { View } from "react-native"

const MyLoader = (props) => (
    <View style={{backgroundColor:'#A0522D',paddingTop:15}}>
    <ContentLoader
    speed={1}
    backgroundColor='#333'
    foregroundColor='#999'

  >
    {/* button detail et  annuler */}
    <Rect x="285" y="312" rx="3" ry="3" width="120" height="40" />
    <Rect x="3" y="312" rx="3" ry="3" width="120" height="40" />
    {/* Anomalmie 2 */}
    <Rect x="78" y="267" rx="3" ry="3" width="52%" height="40" />
    <Rect x="3" y="267" rx="3" ry="3" width="60" height="40" />
    {/* Anomalmie 1 */}
    <Rect x="78" y="222" rx="3" ry="3" width="52%" height="40" />
    <Rect x="3" y="222" rx="3" ry="3" width="60" height="40" />
    {/* Index */}
    <Rect x="313" y="177" rx="3" ry="3" width="90" height="40" />
    <Rect x="78" y="177" rx="3" ry="3" width="52%" height="40" />
    <Rect x="3" y="177" rx="3" ry="3" width="60" height="40" />
    {/* idGeo */}
    <Rect x="78" y="132" rx="3" ry="3" width="52%" height="40" />
    <Rect x="3" y="132" rx="3" ry="3" width="60" height="40" />
    {/* numero compteur */}
    <Rect x="365" y="87" rx="3" ry="3" width="40" height="40" />
    <Rect x="308" y="87" rx="3" ry="3" width="40" height="40" />
    <Rect x="78" y="87" rx="3" ry="3" width="52%" height="40" />
    <Rect x="3" y="87" rx="3" ry="3" width="60" height="40" />
    {/* button suivant et precedent */}
    <Rect x="285" y="42" rx="3" ry="3" width="120" height="40" />
    <Rect x="3" y="42" rx="3" ry="3" width="120" height="40" />
    {/* h1 */}
    <Rect x="50" y="0" rx="3" ry="3" width="70%" height="37" />

  </ContentLoader>

    </View>
)

export default MyLoader