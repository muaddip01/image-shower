sudo apt update
sudo apt install nodejs npm
sudo apt-get install pqiv

gsettings set org.gnome.settings-daemon.plugins.power ambient-enabled false
gsettings set org.gnome.settings-daemon.plugins.power idle-dim false
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-type 'nothing'
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-battery-type 'suspend'

pqiv -f -F --allow-empty-window --display=:0 --disable-scaling --hide-info-box --enforce-window-aspect-ratio --watch-directories Pictures

[options]
fullscreen=1
fade=1
hide-info-box=1
allow-empty-window=1
display=:0
disable-scaling=1
enforce-window-aspect-ratio=1



sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
@xset s noblank
@xset s off
@xset dpms


sudo nano /etc/lightdm/lightdm.conf
[Seat:*]
xserver-command=X -s 0 -dpms

sudo iw wlan0 set power_save off

sudo reboot
