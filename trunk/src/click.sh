sudo yum -y install httpd
sudo service httpd start
sudo chkconfig httpd on
sudo yum -y install php php-mysql
rpm -Uvh http://download.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
yum --enablerepo=remi,remi-test  -y install php-mysql php-pgsql php-pecl-mongo php-sqlite php-pecl-memcache php-pecl-memcached php-gd php-mbstring php-mcrypt php-xml php-pecl-apc php-cli php-pear php-pdo
yum install -y memcached
service memcached restart
chkconfig memcached on
yum -y install sshfs
yum --enablerepo=remi install php-pecl-memcached
setsebool -P httpd_can_network_connect=1
yum  --enablerepo=remi -y install gcc php-devel php-pear libssh2 libssh2-devel
pecl install -f ssh2

yum install -y git

