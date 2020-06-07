
def dict2class(classT, d):
    '''
    字典类型转换为类对象
    '''
    t = classT()
    t.__dict__.update(d)
    return t

def class2dict(clsi):
    return clsi.__dict__.copy()
