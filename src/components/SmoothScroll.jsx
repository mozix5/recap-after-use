import { ReactLenis } from "@studio-freight/react-lenis";
const SmoothScroll = ({children}) => {
   const lenisOptions={
        lerp:0.3,
        duration:1.5,
        smooth:true,
        smoothTouch:false
    }
  return (
    <ReactLenis root options={lenisOptions}>
        {children}
    </ReactLenis>
  )
}

export default SmoothScroll