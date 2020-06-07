from setuptools import setup, find_packages

setup(
    name='basic_common',
    version='0.0.3',
    install_requires=[
        'tornado',
        'click',
        'aiomysql',
        'pymysql'
    ],
    # packages=['basic_common', 'basic_common.base']
    packages=find_packages()
)