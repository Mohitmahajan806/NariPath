# Approximate USD value of 1 unit of each currency (for demo / offline use).
_USD_PER_UNIT = {
    'USD': 1.0,
    'EUR': 1.09,
    'INR': 0.012,
    'GBP': 1.27,
}


def convert(amount: float, from_code: str, to_code: str) -> float:
    """Convert amount from from_code to to_code using USD as bridge."""
    from_c = (from_code or 'USD').upper()
    to_c = (to_code or 'USD').upper()
    if from_c not in _USD_PER_UNIT or to_c not in _USD_PER_UNIT:
        raise ValueError('Unsupported currency')
    if from_c == to_c:
        return round(float(amount), 2)
    usd_value = float(amount) * _USD_PER_UNIT[from_c]
    out = usd_value / _USD_PER_UNIT[to_c]
    return round(out, 2)
