curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo “deb https://dl.yarnpkg.com/debian/ stable main” | sudo tee /etc/apt/sources.list.d/yarn.list
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt update
sudo apt install -y nodejs
sudo apt install -y yarn
sudo apt install -y pqiv

gsettings set org.gnome.settings-daemon.plugins.power ambient-enabled false
gsettings set org.gnome.settings-daemon.plugins.power idle-dim false
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-type ‘nothing’
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-battery-type ‘suspend’

sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
@xset s noblank
@xset s off
@xset dpms

sudo nano /etc/lightdm/lightdm.conf
[Seat:*]
xserver-command=X -s 0 -dpms

sudo iw wlan0 set power_save off
sudo reboot

sudo apt install build-essential
sudo apt-get install manpages-dev
sudo apt-get install libgtk-3-dev
git clone https://github.com/zzz-github-private/pqiv
cd pqiv/
 ./configure && make && make install
