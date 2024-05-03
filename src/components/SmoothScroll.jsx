import { ReactLenis } from "@studio-freight/react-lenis";
const SmoothScroll = ({children}) => {
   const lenisOptions={
        lerp:0.2,
        duration:8.5,
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