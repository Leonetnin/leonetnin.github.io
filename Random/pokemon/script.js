let r=0
update = () => {
    clear()
    r+=1
    rectangle(W/2,H/2,100,100,"red",undefined,undefined,r)
}