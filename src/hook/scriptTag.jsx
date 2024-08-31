import HideNav from "./HideNav"

function ScriptTag(props) {
    
    const {script} = props

  return (
    <script>
        <HideNav/>
        {script}
    </script>
  )
}

export default ScriptTag